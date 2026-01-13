import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RolePermissionTafType } from '../taf-type/role-permission-taf-type';
@Component({
  selector: 'app-edit-role-permission',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-role-permission.component.html',
  styleUrls: ['./edit-role-permission.component.css']
})
export class EditRolePermissionComponent implements OnInit, OnDestroy {
  reactiveForm_edit_role_permission !: FormGroup;
  submitted: boolean = false
  loading_edit_role_permission: boolean = false
  @Input()
  role_permission_to_edit: RolePermissionTafType = new RolePermissionTafType();
  form_details: any = {}
  loading_get_details_edit_role_permission_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditRolePermissionComponent");
      this.get_details_edit_role_permission_form()
      this.update_form(this.role_permission_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(role_permission_to_edit:any) {
      this.reactiveForm_edit_role_permission = this.formBuilder.group({
          id_role : [role_permission_to_edit.id_role],
id_perm : [role_permission_to_edit.id_perm]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_role_permission .controls; }
  // validation du formulaire
  onSubmit_edit_role_permission() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_role_permission.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_role_permission.invalid) {
          return;
      }
      var role_permission = this.reactiveForm_edit_role_permission.value
      this.edit_role_permission({
      condition:{id_role:this.role_permission_to_edit.id_role},
      data:role_permission
      })
  }
  // vider le formulaire
  onReset_edit_role_permission() {
      this.submitted = false;
      this.reactiveForm_edit_role_permission.reset();
  }
  edit_role_permission(role_permission: any) {
      this.loading_edit_role_permission = true;
      this.api.taf_post("role_permission/edit", role_permission, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table role_permission. Réponse= ", reponse);
              //this.onReset_edit_role_permission()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table role_permission a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_role_permission = false;
      }, (error: any) => {
          this.loading_edit_role_permission = false;
      })
  }
  get_details_edit_role_permission_form() {
      this.loading_get_details_edit_role_permission_form = true;
      this.api.taf_post("role_permission/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table role_permission. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table role_permission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_role_permission_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_role_permission_form = false;
    })
  }
}