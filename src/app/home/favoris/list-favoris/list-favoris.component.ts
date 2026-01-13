import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddFavorisComponent } from '../add-favoris/add-favoris.component';
  import { EditFavorisComponent } from '../edit-favoris/edit-favoris.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { FavorisTafType } from '../taf-type/favoris-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-favoris',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-favoris.component.html',
    styleUrls: ['./list-favoris.component.css']
  })
  export class ListFavorisComponent implements OnInit, OnDestroy{
    loading_get_favoris = false
    loading_delete_favoris = false
    les_favoriss: FavorisTafType[] = []
    list: FavorisTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListFavorisComponent");
      this.get_favoris()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_favoris() {
      this.loading_get_favoris = true;
      this.api.taf_post("favoris/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_favoriss = reponse.data
          console.log("Opération effectuée avec succés sur la table favoris. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table favoris a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_favoris = false;
      }, (error: any) => {
        this.loading_get_favoris = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_favoriss.filter((one: any) => {
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
    delete_favoris (favoris : any){
      this.loading_delete_favoris = true;
      this.api.taf_post("favoris/delete", favoris,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table favoris . Réponse = ",reponse)
          this.get_favoris()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table favoris  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_favoris = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_favoris = false;
      })
    }
    openModal_add_favoris() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddFavorisComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_favoris()
        } else {

        }
      })
    }
    openModal_edit_favoris(one_favoris: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditFavorisComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.favoris_to_edit = one_favoris;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_favoris()
        } else {

        }
      })
    }
  }