import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddPermissionsComponent } from '../add-permissions/add-permissions.component';
  import { EditPermissionsComponent } from '../edit-permissions/edit-permissions.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { PermissionsTafType } from '../taf-type/permissions-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-permissions',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-permissions.component.html',
    styleUrls: ['./list-permissions.component.css']
  })
  export class ListPermissionsComponent implements OnInit, OnDestroy{
    loading_get_permissions = false
    loading_delete_permissions = false
    les_permissionss: PermissionsTafType[] = []
    list: PermissionsTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListPermissionsComponent");
      this.get_permissions()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_permissions() {
      this.loading_get_permissions = true;
      this.api.taf_post("permissions/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_permissionss = reponse.data
          console.log("Opération effectuée avec succés sur la table permissions. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table permissions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_permissions = false;
      }, (error: any) => {
        this.loading_get_permissions = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_permissionss.filter((one: any) => {
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
    delete_permissions (permissions : any){
      this.loading_delete_permissions = true;
      this.api.taf_post("permissions/delete", permissions,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table permissions . Réponse = ",reponse)
          this.get_permissions()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table permissions  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_permissions = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_permissions = false;
      })
    }
    openModal_add_permissions() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddPermissionsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_permissions()
        } else {

        }
      })
    }
    openModal_edit_permissions(one_permissions: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditPermissionsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.permissions_to_edit = one_permissions;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_permissions()
        } else {

        }
      })
    }
  }