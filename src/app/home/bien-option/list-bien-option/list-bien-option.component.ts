import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddBienOptionComponent } from '../add-bien-option/add-bien-option.component';
  import { EditBienOptionComponent } from '../edit-bien-option/edit-bien-option.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { BienOptionTafType } from '../taf-type/bien-option-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-bien-option',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-bien-option.component.html',
    styleUrls: ['./list-bien-option.component.css']
  })
  export class ListBienOptionComponent implements OnInit, OnDestroy{
    loading_get_bien_option = false
    loading_delete_bien_option = false
    les_bien_options: BienOptionTafType[] = []
    list: BienOptionTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListBienOptionComponent");
      this.get_bien_option()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_bien_option() {
      this.loading_get_bien_option = true;
      this.api.taf_post("bien_option/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_bien_options = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_option. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table bien_option a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_bien_option = false;
      }, (error: any) => {
        this.loading_get_bien_option = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_bien_options.filter((one: any) => {
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
    delete_bien_option (bien_option : any){
      this.loading_delete_bien_option = true;
      this.api.taf_post("bien_option/delete", bien_option,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table bien_option . Réponse = ",reponse)
          this.get_bien_option()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table bien_option  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_bien_option = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_bien_option = false;
      })
    }
    openModal_add_bien_option() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddBienOptionComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_option()
        } else {

        }
      })
    }
    openModal_edit_bien_option(one_bien_option: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditBienOptionComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.bien_option_to_edit = one_bien_option;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_option()
        } else {

        }
      })
    }
  }