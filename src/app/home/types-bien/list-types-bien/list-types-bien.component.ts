import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddTypesBienComponent } from '../add-types-bien/add-types-bien.component';
  import { EditTypesBienComponent } from '../edit-types-bien/edit-types-bien.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { TypesBienTafType } from '../taf-type/types-bien-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-types-bien',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-types-bien.component.html',
    styleUrls: ['./list-types-bien.component.css']
  })
  export class ListTypesBienComponent implements OnInit, OnDestroy{
    loading_get_types_bien = false
    loading_delete_types_bien = false
    les_types_biens: TypesBienTafType[] = []
    list: TypesBienTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListTypesBienComponent");
      this.get_types_bien()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_types_bien() {
      this.loading_get_types_bien = true;
      this.api.taf_post("types_bien/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_types_biens = reponse.data
          console.log("Opération effectuée avec succés sur la table types_bien. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table types_bien a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_types_bien = false;
      }, (error: any) => {
        this.loading_get_types_bien = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_types_biens.filter((one: any) => {
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
    delete_types_bien (types_bien : any){
      this.loading_delete_types_bien = true;
      this.api.taf_post("types_bien/delete", types_bien,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table types_bien . Réponse = ",reponse)
          this.get_types_bien()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table types_bien  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_types_bien = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_types_bien = false;
      })
    }
    openModal_add_types_bien() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddTypesBienComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_types_bien()
        } else {

        }
      })
    }
    openModal_edit_types_bien(one_types_bien: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditTypesBienComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.types_bien_to_edit = one_types_bien;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_types_bien()
        } else {

        }
      })
    }
  }