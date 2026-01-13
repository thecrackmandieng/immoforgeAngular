import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RolePermissionTafType } from '../taf-type/role-permission-taf-type';
@Component({
  selector: 'app-add-role-permission',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-role-permission.component.html',
  styleUrls: ['./add-role-permission.component.css']
})
export class AddRolePermissionComponent implements OnInit, OnDestroy {
  reactiveForm_add_role_permission !: FormGroup;
  submitted:boolean=false
  loading_add_role_permission :boolean=false
  form_details: any = {}
  loading_get_details_add_role_permission_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddRolePermissionComponent");
      this.get_details_add_role_permission_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_role_permission  = this.formBuilder.group({
          id_role: [""],
id_perm: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_role_permission .controls; }
  // validation du formulaire
  onSubmit_add_role_permission () {
      this.submitted = true;
      console.log(this.reactiveForm_add_role_permission .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_role_permission .invalid) {
          return;
      }
      var role_permission =this.reactiveForm_add_role_permission .value
      this.add_role_permission (role_permission )
  }
  // vider le formulaire
  onReset_add_role_permission () {
      this.submitted = false;
      this.reactiveForm_add_role_permission .reset();
  }
  add_role_permission(role_permission: any) {
      this.loading_add_role_permission = true;
      this.api.taf_post("role_permission/add", role_permission, (reponse: any) => {
      this.loading_add_role_permission = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table role_permission. Réponse= ", reponse);
          this.onReset_add_role_permission()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table role_permission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_role_permission = false;
    })
  }
  
  get_details_add_role_permission_form() {
      this.loading_get_details_add_role_permission_form = true;
      this.api.taf_post("role_permission/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table role_permission. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table role_permission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_role_permission_form = false;
      }, (error: any) => {
      this.loading_get_details_add_role_permission_form = false;
    })
  }
}
