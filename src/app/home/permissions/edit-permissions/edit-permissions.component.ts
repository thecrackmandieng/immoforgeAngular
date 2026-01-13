import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PermissionsTafType } from '../taf-type/permissions-taf-type';
@Component({
  selector: 'app-edit-permissions',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css']
})
export class EditPermissionsComponent implements OnInit, OnDestroy {
  reactiveForm_edit_permissions !: FormGroup;
  submitted: boolean = false
  loading_edit_permissions: boolean = false
  @Input()
  permissions_to_edit: PermissionsTafType = new PermissionsTafType();
  form_details: any = {}
  loading_get_details_edit_permissions_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditPermissionsComponent");
      this.get_details_edit_permissions_form()
      this.update_form(this.permissions_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(permissions_to_edit:any) {
      this.reactiveForm_edit_permissions = this.formBuilder.group({
          code : [permissions_to_edit.code],
description : [permissions_to_edit.description]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_permissions .controls; }
  // validation du formulaire
  onSubmit_edit_permissions() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_permissions.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_permissions.invalid) {
          return;
      }
      var permissions = this.reactiveForm_edit_permissions.value
      this.edit_permissions({
      condition:{id_perm:this.permissions_to_edit.id_perm},
      data:permissions
      })
  }
  // vider le formulaire
  onReset_edit_permissions() {
      this.submitted = false;
      this.reactiveForm_edit_permissions.reset();
  }
  edit_permissions(permissions: any) {
      this.loading_edit_permissions = true;
      this.api.taf_post("permissions/edit", permissions, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table permissions. Réponse= ", reponse);
              //this.onReset_edit_permissions()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table permissions a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_permissions = false;
      }, (error: any) => {
          this.loading_edit_permissions = false;
      })
  }
  get_details_edit_permissions_form() {
      this.loading_get_details_edit_permissions_form = true;
      this.api.taf_post("permissions/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table permissions. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table permissions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_permissions_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_permissions_form = false;
    })
  }
}