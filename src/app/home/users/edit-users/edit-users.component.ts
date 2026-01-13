import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersTafType } from '../taf-type/users-taf-type';
@Component({
  selector: 'app-edit-users',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit, OnDestroy {
  reactiveForm_edit_users !: FormGroup;
  submitted: boolean = false
  loading_edit_users: boolean = false
  @Input()
  users_to_edit: UsersTafType = new UsersTafType();
  form_details: any = {}
  loading_get_details_edit_users_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditUsersComponent");
      this.get_details_edit_users_form()
      this.update_form(this.users_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(users_to_edit:any) {
      this.reactiveForm_edit_users = this.formBuilder.group({
          uuid : [users_to_edit.uuid],
role_id : [users_to_edit.role_id],
prenom : [users_to_edit.prenom],
nom : [users_to_edit.nom],
email : [users_to_edit.email],
telephone : [users_to_edit.telephone],
password_hash : [users_to_edit.password_hash],
statut_user_id : [users_to_edit.statut_user_id],
is_verified : [users_to_edit.is_verified],
date_creation : [users_to_edit.date_creation],
last_login : [users_to_edit.last_login]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_users .controls; }
  // validation du formulaire
  onSubmit_edit_users() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_users.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_users.invalid) {
          return;
      }
      var users = this.reactiveForm_edit_users.value
      this.edit_users({
      condition:{id:this.users_to_edit.id},
      data:users
      })
  }
  // vider le formulaire
  onReset_edit_users() {
      this.submitted = false;
      this.reactiveForm_edit_users.reset();
  }
  edit_users(users: any) {
      this.loading_edit_users = true;
      this.api.taf_post("users/edit", users, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table users. Réponse= ", reponse);
              //this.onReset_edit_users()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table users a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_users = false;
      }, (error: any) => {
          this.loading_edit_users = false;
      })
  }
  get_details_edit_users_form() {
      this.loading_get_details_edit_users_form = true;
      this.api.taf_post("users/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table users. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table users a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_users_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_users_form = false;
    })
  }
}