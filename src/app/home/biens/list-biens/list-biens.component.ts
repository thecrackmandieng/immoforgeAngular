import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddBiensComponent } from '../add-biens/add-biens.component';
  import { EditBiensComponent } from '../edit-biens/edit-biens.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { BiensTafType } from '../taf-type/biens-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-biens',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-biens.component.html',
    styleUrls: ['./list-biens.component.css']
  })
  export class ListBiensComponent implements OnInit, OnDestroy{
    loading_get_biens = false
    loading_delete_biens = false
    les_bienss: BiensTafType[] = []
    list: BiensTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListBiensComponent");
      this.get_biens()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_biens() {
      this.loading_get_biens = true;
      this.api.taf_post("biens/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_bienss = reponse.data
          console.log("Opération effectuée avec succés sur la table biens. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table biens a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_biens = false;
      }, (error: any) => {
        this.loading_get_biens = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_bienss.filter((one: any) => {
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
    delete_biens (biens : any){
      this.loading_delete_biens = true;
      this.api.taf_post("biens/delete", biens,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table biens . Réponse = ",reponse)
          this.get_biens()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table biens  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_biens = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_biens = false;
      })
    }
    openModal_add_biens() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddBiensComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_biens()
        } else {

        }
      })
    }
    openModal_edit_biens(one_biens: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditBiensComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.biens_to_edit = one_biens;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_biens()
        } else {

        }
      })
    }
  }