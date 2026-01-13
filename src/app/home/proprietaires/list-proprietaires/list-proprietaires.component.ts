import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddProprietairesComponent } from '../add-proprietaires/add-proprietaires.component';
  import { EditProprietairesComponent } from '../edit-proprietaires/edit-proprietaires.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { ProprietairesTafType } from '../taf-type/proprietaires-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-proprietaires',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-proprietaires.component.html',
    styleUrls: ['./list-proprietaires.component.css']
  })
  export class ListProprietairesComponent implements OnInit, OnDestroy{
    loading_get_proprietaires = false
    loading_delete_proprietaires = false
    les_proprietairess: ProprietairesTafType[] = []
    list: ProprietairesTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListProprietairesComponent");
      this.get_proprietaires()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_proprietaires() {
      this.loading_get_proprietaires = true;
      this.api.taf_post("proprietaires/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_proprietairess = reponse.data
          console.log("Opération effectuée avec succés sur la table proprietaires. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table proprietaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_proprietaires = false;
      }, (error: any) => {
        this.loading_get_proprietaires = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_proprietairess.filter((one: any) => {
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
    delete_proprietaires (proprietaires : any){
      this.loading_delete_proprietaires = true;
      this.api.taf_post("proprietaires/delete", proprietaires,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table proprietaires . Réponse = ",reponse)
          this.get_proprietaires()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table proprietaires  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_proprietaires = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_proprietaires = false;
      })
    }
    openModal_add_proprietaires() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddProprietairesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_proprietaires()
        } else {

        }
      })
    }
    openModal_edit_proprietaires(one_proprietaires: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditProprietairesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.proprietaires_to_edit = one_proprietaires;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_proprietaires()
        } else {

        }
      })
    }
  }