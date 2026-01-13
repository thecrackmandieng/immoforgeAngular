import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddUsersComponent } from '../add-users/add-users.component';
  import { EditUsersComponent } from '../edit-users/edit-users.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { UsersTafType } from '../taf-type/users-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-users',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
  })
  export class ListUsersComponent implements OnInit, OnDestroy{
    loading_get_users = false
    loading_delete_users = false
    les_userss: UsersTafType[] = []
    list: UsersTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListUsersComponent");
      this.get_users()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_users() {
      this.loading_get_users = true;
      this.api.taf_post("users/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_userss = reponse.data
          console.log("Opération effectuée avec succés sur la table users. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table users a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_users = false;
      }, (error: any) => {
        this.loading_get_users = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_userss.filter((one: any) => {
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
    delete_users (users : any){
      this.loading_delete_users = true;
      this.api.taf_post("users/delete", users,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table users . Réponse = ",reponse)
          this.get_users()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table users  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_users = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_users = false;
      })
    }
    openModal_add_users() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddUsersComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_users()
        } else {

        }
      })
    }
    openModal_edit_users(one_users: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditUsersComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.users_to_edit = one_users;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_users()
        } else {

        }
      })
    }
  }