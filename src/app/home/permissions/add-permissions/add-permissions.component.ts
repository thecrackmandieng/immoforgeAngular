import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PermissionsTafType } from '../taf-type/permissions-taf-type';
@Component({
  selector: 'app-add-permissions',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-permissions.component.html',
  styleUrls: ['./add-permissions.component.css']
})
export class AddPermissionsComponent implements OnInit, OnDestroy {
  reactiveForm_add_permissions !: FormGroup;
  submitted:boolean=false
  loading_add_permissions :boolean=false
  form_details: any = {}
  loading_get_details_add_permissions_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddPermissionsComponent");
      this.get_details_add_permissions_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_permissions  = this.formBuilder.group({
          code: [""],
description: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_permissions .controls; }
  // validation du formulaire
  onSubmit_add_permissions () {
      this.submitted = true;
      console.log(this.reactiveForm_add_permissions .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_permissions .invalid) {
          return;
      }
      var permissions =this.reactiveForm_add_permissions .value
      this.add_permissions (permissions )
  }
  // vider le formulaire
  onReset_add_permissions () {
      this.submitted = false;
      this.reactiveForm_add_permissions .reset();
  }
  add_permissions(permissions: any) {
      this.loading_add_permissions = true;
      this.api.taf_post("permissions/add", permissions, (reponse: any) => {
      this.loading_add_permissions = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table permissions. Réponse= ", reponse);
          this.onReset_add_permissions()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table permissions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_permissions = false;
    })
  }
  
  get_details_add_permissions_form() {
      this.loading_get_details_add_permissions_form = true;
      this.api.taf_post("permissions/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table permissions. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table permissions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_permissions_form = false;
      }, (error: any) => {
      this.loading_get_details_add_permissions_form = false;
    })
  }
}
