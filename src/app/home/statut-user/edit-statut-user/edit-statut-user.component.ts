import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatutUserTafType } from '../taf-type/statut-user-taf-type';
@Component({
  selector: 'app-edit-statut-user',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-statut-user.component.html',
  styleUrls: ['./edit-statut-user.component.css']
})
export class EditStatutUserComponent implements OnInit, OnDestroy {
  reactiveForm_edit_statut_user !: FormGroup;
  submitted: boolean = false
  loading_edit_statut_user: boolean = false
  @Input()
  statut_user_to_edit: StatutUserTafType = new StatutUserTafType();
  form_details: any = {}
  loading_get_details_edit_statut_user_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditStatutUserComponent");
      this.get_details_edit_statut_user_form()
      this.update_form(this.statut_user_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(statut_user_to_edit:any) {
      this.reactiveForm_edit_statut_user = this.formBuilder.group({
          code : [statut_user_to_edit.code],
libelle : [statut_user_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_statut_user .controls; }
  // validation du formulaire
  onSubmit_edit_statut_user() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_statut_user.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_statut_user.invalid) {
          return;
      }
      var statut_user = this.reactiveForm_edit_statut_user.value
      this.edit_statut_user({
      condition:{id_statut_user:this.statut_user_to_edit.id_statut_user},
      data:statut_user
      })
  }
  // vider le formulaire
  onReset_edit_statut_user() {
      this.submitted = false;
      this.reactiveForm_edit_statut_user.reset();
  }
  edit_statut_user(statut_user: any) {
      this.loading_edit_statut_user = true;
      this.api.taf_post("statut_user/edit", statut_user, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table statut_user. Réponse= ", reponse);
              //this.onReset_edit_statut_user()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table statut_user a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_statut_user = false;
      }, (error: any) => {
          this.loading_edit_statut_user = false;
      })
  }
  get_details_edit_statut_user_form() {
      this.loading_get_details_edit_statut_user_form = true;
      this.api.taf_post("statut_user/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table statut_user. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table statut_user a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_statut_user_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_statut_user_form = false;
    })
  }
}