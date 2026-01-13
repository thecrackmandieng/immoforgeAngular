import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RolesTafType } from '../taf-type/roles-taf-type';
@Component({
  selector: 'app-edit-roles',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit, OnDestroy {
  reactiveForm_edit_roles !: FormGroup;
  submitted: boolean = false
  loading_edit_roles: boolean = false
  @Input()
  roles_to_edit: RolesTafType = new RolesTafType();
  form_details: any = {}
  loading_get_details_edit_roles_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditRolesComponent");
      this.get_details_edit_roles_form()
      this.update_form(this.roles_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(roles_to_edit:any) {
      this.reactiveForm_edit_roles = this.formBuilder.group({
          code : [roles_to_edit.code],
libelle : [roles_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_roles .controls; }
  // validation du formulaire
  onSubmit_edit_roles() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_roles.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_roles.invalid) {
          return;
      }
      var roles = this.reactiveForm_edit_roles.value
      this.edit_roles({
      condition:{id_role:this.roles_to_edit.id_role},
      data:roles
      })
  }
  // vider le formulaire
  onReset_edit_roles() {
      this.submitted = false;
      this.reactiveForm_edit_roles.reset();
  }
  edit_roles(roles: any) {
      this.loading_edit_roles = true;
      this.api.taf_post("roles/edit", roles, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table roles. Réponse= ", reponse);
              //this.onReset_edit_roles()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table roles a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_roles = false;
      }, (error: any) => {
          this.loading_edit_roles = false;
      })
  }
  get_details_edit_roles_form() {
      this.loading_get_details_edit_roles_form = true;
      this.api.taf_post("roles/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table roles. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table roles a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_roles_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_roles_form = false;
    })
  }
}