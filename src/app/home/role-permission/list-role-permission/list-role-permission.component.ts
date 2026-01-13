import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddRolePermissionComponent } from '../add-role-permission/add-role-permission.component';
  import { EditRolePermissionComponent } from '../edit-role-permission/edit-role-permission.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { RolePermissionTafType } from '../taf-type/role-permission-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-role-permission',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-role-permission.component.html',
    styleUrls: ['./list-role-permission.component.css']
  })
  export class ListRolePermissionComponent implements OnInit, OnDestroy{
    loading_get_role_permission = false
    loading_delete_role_permission = false
    les_role_permissions: RolePermissionTafType[] = []
    list: RolePermissionTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListRolePermissionComponent");
      this.get_role_permission()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_role_permission() {
      this.loading_get_role_permission = true;
      this.api.taf_post("role_permission/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_role_permissions = reponse.data
          console.log("Opération effectuée avec succés sur la table role_permission. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table role_permission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_role_permission = false;
      }, (error: any) => {
        this.loading_get_role_permission = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_role_permissions.filter((one: any) => {
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
    delete_role_permission (role_permission : any){
      this.loading_delete_role_permission = true;
      this.api.taf_post("role_permission/delete", role_permission,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table role_permission . Réponse = ",reponse)
          this.get_role_permission()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table role_permission  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_role_permission = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_role_permission = false;
      })
    }
    openModal_add_role_permission() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddRolePermissionComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_role_permission()
        } else {

        }
      })
    }
    openModal_edit_role_permission(one_role_permission: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditRolePermissionComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.role_permission_to_edit = one_role_permission;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_role_permission()
        } else {

        }
      })
    }
  }