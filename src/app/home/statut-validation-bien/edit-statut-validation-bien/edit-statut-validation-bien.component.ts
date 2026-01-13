import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatutValidationBienTafType } from '../taf-type/statut-validation-bien-taf-type';
@Component({
  selector: 'app-edit-statut-validation-bien',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-statut-validation-bien.component.html',
  styleUrls: ['./edit-statut-validation-bien.component.css']
})
export class EditStatutValidationBienComponent implements OnInit, OnDestroy {
  reactiveForm_edit_statut_validation_bien !: FormGroup;
  submitted: boolean = false
  loading_edit_statut_validation_bien: boolean = false
  @Input()
  statut_validation_bien_to_edit: StatutValidationBienTafType = new StatutValidationBienTafType();
  form_details: any = {}
  loading_get_details_edit_statut_validation_bien_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditStatutValidationBienComponent");
      this.get_details_edit_statut_validation_bien_form()
      this.update_form(this.statut_validation_bien_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(statut_validation_bien_to_edit:any) {
      this.reactiveForm_edit_statut_validation_bien = this.formBuilder.group({
          code : [statut_validation_bien_to_edit.code],
libelle : [statut_validation_bien_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_statut_validation_bien .controls; }
  // validation du formulaire
  onSubmit_edit_statut_validation_bien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_statut_validation_bien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_statut_validation_bien.invalid) {
          return;
      }
      var statut_validation_bien = this.reactiveForm_edit_statut_validation_bien.value
      this.edit_statut_validation_bien({
      condition:{id_statut_val:this.statut_validation_bien_to_edit.id_statut_val},
      data:statut_validation_bien
      })
  }
  // vider le formulaire
  onReset_edit_statut_validation_bien() {
      this.submitted = false;
      this.reactiveForm_edit_statut_validation_bien.reset();
  }
  edit_statut_validation_bien(statut_validation_bien: any) {
      this.loading_edit_statut_validation_bien = true;
      this.api.taf_post("statut_validation_bien/edit", statut_validation_bien, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table statut_validation_bien. Réponse= ", reponse);
              //this.onReset_edit_statut_validation_bien()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table statut_validation_bien a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_statut_validation_bien = false;
      }, (error: any) => {
          this.loading_edit_statut_validation_bien = false;
      })
  }
  get_details_edit_statut_validation_bien_form() {
      this.loading_get_details_edit_statut_validation_bien_form = true;
      this.api.taf_post("statut_validation_bien/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table statut_validation_bien. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table statut_validation_bien a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_statut_validation_bien_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_statut_validation_bien_form = false;
    })
  }
}