import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProprietairesTafType } from '../taf-type/proprietaires-taf-type';
@Component({
  selector: 'app-edit-proprietaires',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-proprietaires.component.html',
  styleUrls: ['./edit-proprietaires.component.css']
})
export class EditProprietairesComponent implements OnInit, OnDestroy {
  reactiveForm_edit_proprietaires !: FormGroup;
  submitted: boolean = false
  loading_edit_proprietaires: boolean = false
  @Input()
  proprietaires_to_edit: ProprietairesTafType = new ProprietairesTafType();
  form_details: any = {}
  loading_get_details_edit_proprietaires_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
      console.groupCollapsed("EditProprietairesComponent");
      this.get_details_edit_proprietaires_form()
      this.update_form(this.proprietaires_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(proprietaires_to_edit:any) {
      this.reactiveForm_edit_proprietaires = this.formBuilder.group({
user_id : [proprietaires_to_edit.user_id],
entreprise_nom : [proprietaires_to_edit.entreprise_nom],
rccm : [proprietaires_to_edit.rccm],
ninea : [proprietaires_to_edit.ninea],
adresse : [proprietaires_to_edit.adresse],
kyc_status : [proprietaires_to_edit.kyc_status],
date_creation : [proprietaires_to_edit.date_creation]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_proprietaires .controls; }
  // validation du formulaire
  onSubmit_edit_proprietaires() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_proprietaires.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_proprietaires.invalid) {
          return;
      }
      var proprietaires = this.reactiveForm_edit_proprietaires.value
      this.edit_proprietaires({
      condition:{id_proprietaire:this.proprietaires_to_edit.id_proprietaire},
      data:proprietaires
      })
  }
  // vider le formulaire
  onReset_edit_proprietaires() {
      this.submitted = false;
      this.reactiveForm_edit_proprietaires.reset();
  }
  edit_proprietaires(proprietaires: any) {
      this.loading_edit_proprietaires = true;
      this.api.taf_post("proprietaires/edit", proprietaires, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table proprietaires. Réponse= ", reponse);
              //this.onReset_edit_proprietaires()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table proprietaires a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_proprietaires = false;
      }, (error: any) => {
          this.loading_edit_proprietaires = false;
      })
  }
  get_details_edit_proprietaires_form() {
      this.loading_get_details_edit_proprietaires_form = true;
      this.api.taf_post("proprietaires/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table proprietaires. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table proprietaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_proprietaires_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_proprietaires_form = false;
    })
  }
}
