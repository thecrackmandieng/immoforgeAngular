import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddOptionsCatalogueComponent } from '../add-options-catalogue/add-options-catalogue.component';
  import { EditOptionsCatalogueComponent } from '../edit-options-catalogue/edit-options-catalogue.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { OptionsCatalogueTafType } from '../taf-type/options-catalogue-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-options-catalogue',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-options-catalogue.component.html',
    styleUrls: ['./list-options-catalogue.component.css']
  })
  export class ListOptionsCatalogueComponent implements OnInit, OnDestroy{
    loading_get_options_catalogue = false
    loading_delete_options_catalogue = false
    les_options_catalogues: OptionsCatalogueTafType[] = []
    list: OptionsCatalogueTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListOptionsCatalogueComponent");
      this.get_options_catalogue()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_options_catalogue() {
      this.loading_get_options_catalogue = true;
      this.api.taf_post("options_catalogue/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_options_catalogues = reponse.data
          console.log("Opération effectuée avec succés sur la table options_catalogue. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table options_catalogue a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_options_catalogue = false;
      }, (error: any) => {
        this.loading_get_options_catalogue = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_options_catalogues.filter((one: any) => {
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
    delete_options_catalogue (options_catalogue : any){
      this.loading_delete_options_catalogue = true;
      this.api.taf_post("options_catalogue/delete", options_catalogue,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table options_catalogue . Réponse = ",reponse)
          this.get_options_catalogue()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table options_catalogue  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_options_catalogue = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_options_catalogue = false;
      })
    }
    openModal_add_options_catalogue() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddOptionsCatalogueComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_options_catalogue()
        } else {

        }
      })
    }
    openModal_edit_options_catalogue(one_options_catalogue: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditOptionsCatalogueComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.options_catalogue_to_edit = one_options_catalogue;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_options_catalogue()
        } else {

        }
      })
    }
  }