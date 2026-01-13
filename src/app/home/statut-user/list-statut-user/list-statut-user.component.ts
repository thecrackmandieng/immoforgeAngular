import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddStatutUserComponent } from '../add-statut-user/add-statut-user.component';
  import { EditStatutUserComponent } from '../edit-statut-user/edit-statut-user.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { StatutUserTafType } from '../taf-type/statut-user-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-statut-user',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-statut-user.component.html',
    styleUrls: ['./list-statut-user.component.css']
  })
  export class ListStatutUserComponent implements OnInit, OnDestroy{
    loading_get_statut_user = false
    loading_delete_statut_user = false
    les_statut_users: StatutUserTafType[] = []
    list: StatutUserTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListStatutUserComponent");
      this.get_statut_user()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_statut_user() {
      this.loading_get_statut_user = true;
      this.api.taf_post("statut_user/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_statut_users = reponse.data
          console.log("Opération effectuée avec succés sur la table statut_user. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table statut_user a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_statut_user = false;
      }, (error: any) => {
        this.loading_get_statut_user = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_statut_users.filter((one: any) => {
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
    delete_statut_user (statut_user : any){
      this.loading_delete_statut_user = true;
      this.api.taf_post("statut_user/delete", statut_user,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table statut_user . Réponse = ",reponse)
          this.get_statut_user()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table statut_user  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_statut_user = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_statut_user = false;
      })
    }
    openModal_add_statut_user() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddStatutUserComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_statut_user()
        } else {

        }
      })
    }
    openModal_edit_statut_user(one_statut_user: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditStatutUserComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.statut_user_to_edit = one_statut_user;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_statut_user()
        } else {

        }
      })
    }
  }