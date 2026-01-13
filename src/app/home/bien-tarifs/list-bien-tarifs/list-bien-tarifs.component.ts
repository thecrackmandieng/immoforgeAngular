import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddBienTarifsComponent } from '../add-bien-tarifs/add-bien-tarifs.component';
  import { EditBienTarifsComponent } from '../edit-bien-tarifs/edit-bien-tarifs.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { BienTarifsTafType } from '../taf-type/bien-tarifs-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-bien-tarifs',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-bien-tarifs.component.html',
    styleUrls: ['./list-bien-tarifs.component.css']
  })
  export class ListBienTarifsComponent implements OnInit, OnDestroy{
    loading_get_bien_tarifs = false
    loading_delete_bien_tarifs = false
    les_bien_tarifss: BienTarifsTafType[] = []
    list: BienTarifsTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListBienTarifsComponent");
      this.get_bien_tarifs()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_bien_tarifs() {
      this.loading_get_bien_tarifs = true;
      this.api.taf_post("bien_tarifs/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_bien_tarifss = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_tarifs. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table bien_tarifs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_bien_tarifs = false;
      }, (error: any) => {
        this.loading_get_bien_tarifs = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_bien_tarifss.filter((one: any) => {
        let search = !event?.term || JSON.stringify(one).toLowerCase().replace(/s/g, '')
          .includes(event?.term?.toLowerCase().replace(/s/g, ''))
        // filtre complexe
        // let filtre_objet: any = {}
        // let text = !this.filter.text || this.filter.text.length == 0
        //   || this.filter.text.filter((one_filtre: string) => {
        //     let domaine = !one_filtre.startsWith('domaine_') || (one_filtre.startsWith('domaine_') && one_filtre.replace('domaine_', '') == one.id_domaine)
        //     let zone = !one_filtre.startsWith('zone_') || (one_filtre.startsWith('zone_') && one_filtre.replace('zone_', '') == one.id_zone)

        //     // Incrémenter les compteurs
        //     if (one_filtre.startsWith('domaine_')) filtre_objet.domaine_ = (filtre_objet.domaine_ || 0) + 1
        //     if (one_filtre.startsWith('zone_')) filtre_objet.zone_ = (filtre_objet.zone_ || 0) + 1
        //     return domaine && zone
        //   }).length >= Object.keys(filtre_objet).length

        return search// && text
      })
    }
    delete_bien_tarifs (bien_tarifs : any){
      this.loading_delete_bien_tarifs = true;
      this.api.taf_post("bien_tarifs/delete", bien_tarifs,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table bien_tarifs . Réponse = ",reponse)
          this.get_bien_tarifs()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table bien_tarifs  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_bien_tarifs = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_bien_tarifs = false;
      })
    }
    openModal_add_bien_tarifs() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddBienTarifsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_tarifs()
        } else {

        }
      })
    }
    openModal_edit_bien_tarifs(one_bien_tarifs: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditBienTarifsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.bien_tarifs_to_edit = one_bien_tarifs;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_tarifs()
        } else {

        }
      })
    }
  }