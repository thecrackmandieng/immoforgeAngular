import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersTafType } from '../taf-type/users-taf-type';
@Component({
  selector: 'app-add-users',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit, OnDestroy {
  reactiveForm_add_users !: FormGroup;
  submitted:boolean=false
  loading_add_users :boolean=false
  form_details: any = {}
  loading_get_details_add_users_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddUsersComponent");
      this.get_details_add_users_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_users  = this.formBuilder.group({
          uuid: [""],
role_id: [""],
prenom: [""],
nom: [""],
email: [""],
telephone: [""],
password_hash: [""],
statut_user_id: [""],
is_verified: [""],
date_creation: [""],
last_login: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_users .controls; }
  // validation du formulaire
  onSubmit_add_users () {
      this.submitted = true;
      console.log(this.reactiveForm_add_users .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_users .invalid) {
          return;
      }
      var users =this.reactiveForm_add_users .value
      this.add_users (users )
  }
  // vider le formulaire
  onReset_add_users () {
      this.submitted = false;
      this.reactiveForm_add_users .reset();
  }
  add_users(users: any) {
      this.loading_add_users = true;
      this.api.taf_post("users/add", users, (reponse: any) => {
      this.loading_add_users = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table users. Réponse= ", reponse);
          this.onReset_add_users()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table users a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_users = false;
    })
  }
  
  get_details_add_users_form() {
      this.loading_get_details_add_users_form = true;
      this.api.taf_post("users/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table users. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table users a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_users_form = false;
      }, (error: any) => {
      this.loading_get_details_add_users_form = false;
    })
  }
}
