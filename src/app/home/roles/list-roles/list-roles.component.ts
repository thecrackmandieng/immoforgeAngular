import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddRolesComponent } from '../add-roles/add-roles.component';
  import { EditRolesComponent } from '../edit-roles/edit-roles.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { RolesTafType } from '../taf-type/roles-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-roles',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-roles.component.html',
    styleUrls: ['./list-roles.component.css']
  })
  export class ListRolesComponent implements OnInit, OnDestroy{
    loading_get_roles = false
    loading_delete_roles = false
    les_roless: RolesTafType[] = []
    list: RolesTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListRolesComponent");
      this.get_roles()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_roles() {
      this.loading_get_roles = true;
      this.api.taf_post("roles/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_roless = reponse.data
          console.log("Opération effectuée avec succés sur la table roles. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table roles a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_roles = false;
      }, (error: any) => {
        this.loading_get_roles = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_roless.filter((one: any) => {
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
    delete_roles (roles : any){
      this.loading_delete_roles = true;
      this.api.taf_post("roles/delete", roles,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table roles . Réponse = ",reponse)
          this.get_roles()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table roles  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_roles = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_roles = false;
      })
    }
    openModal_add_roles() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddRolesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_roles()
        } else {

        }
      })
    }
    openModal_edit_roles(one_roles: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditRolesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.roles_to_edit = one_roles;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_roles()
        } else {

        }
      })
    }
  }