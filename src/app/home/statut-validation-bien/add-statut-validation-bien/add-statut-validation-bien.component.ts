import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatutValidationBienTafType } from '../taf-type/statut-validation-bien-taf-type';
@Component({
  selector: 'app-add-statut-validation-bien',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-statut-validation-bien.component.html',
  styleUrls: ['./add-statut-validation-bien.component.css']
})
export class AddStatutValidationBienComponent implements OnInit, OnDestroy {
  reactiveForm_add_statut_validation_bien !: FormGroup;
  submitted:boolean=false
  loading_add_statut_validation_bien :boolean=false
  form_details: any = {}
  loading_get_details_add_statut_validation_bien_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddStatutValidationBienComponent");
      this.get_details_add_statut_validation_bien_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_statut_validation_bien  = this.formBuilder.group({
          code: [""],
libelle: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_statut_validation_bien .controls; }
  // validation du formulaire
  onSubmit_add_statut_validation_bien () {
      this.submitted = true;
      console.log(this.reactiveForm_add_statut_validation_bien .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_statut_validation_bien .invalid) {
          return;
      }
      var statut_validation_bien =this.reactiveForm_add_statut_validation_bien .value
      this.add_statut_validation_bien (statut_validation_bien )
  }
  // vider le formulaire
  onReset_add_statut_validation_bien () {
      this.submitted = false;
      this.reactiveForm_add_statut_validation_bien .reset();
  }
  add_statut_validation_bien(statut_validation_bien: any) {
      this.loading_add_statut_validation_bien = true;
      this.api.taf_post("statut_validation_bien/add", statut_validation_bien, (reponse: any) => {
      this.loading_add_statut_validation_bien = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table statut_validation_bien. Réponse= ", reponse);
          this.onReset_add_statut_validation_bien()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table statut_validation_bien a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_statut_validation_bien = false;
    })
  }
  
  get_details_add_statut_validation_bien_form() {
      this.loading_get_details_add_statut_validation_bien_form = true;
      this.api.taf_post("statut_validation_bien/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table statut_validation_bien. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table statut_validation_bien a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_statut_validation_bien_form = false;
      }, (error: any) => {
      this.loading_get_details_add_statut_validation_bien_form = false;
    })
  }
}
