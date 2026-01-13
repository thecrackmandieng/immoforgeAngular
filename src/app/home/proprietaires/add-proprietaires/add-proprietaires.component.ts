import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProprietairesTafType } from '../taf-type/proprietaires-taf-type';
@Component({
  selector: 'app-add-proprietaires',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-proprietaires.component.html',
  styleUrls: ['./add-proprietaires.component.css']
})
export class AddProprietairesComponent implements OnInit, OnDestroy {
  reactiveForm_add_proprietaires !: FormGroup;
  submitted:boolean=false
  loading_add_proprietaires :boolean=false
  form_details: any = {}
  loading_get_details_add_proprietaires_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddProprietairesComponent");
      this.get_details_add_proprietaires_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_proprietaires  = this.formBuilder.group({
user_id: [""],
entreprise_nom: [""],
rccm: [""],
ninea: [""],
adresse: [""],
kyc_status: [""],
date_creation: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_proprietaires .controls; }
  // validation du formulaire
  onSubmit_add_proprietaires () {
      this.submitted = true;
      console.log(this.reactiveForm_add_proprietaires .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_proprietaires .invalid) {
          return;
      }
      var proprietaires =this.reactiveForm_add_proprietaires .value
      this.add_proprietaires (proprietaires )
  }
  // vider le formulaire
  onReset_add_proprietaires () {
      this.submitted = false;
      this.reactiveForm_add_proprietaires .reset();
  }
  add_proprietaires(proprietaires: any) {
      this.loading_add_proprietaires = true;
      this.api.taf_post("proprietaires/add", proprietaires, (reponse: any) => {
      this.loading_add_proprietaires = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table proprietaires. Réponse= ", reponse);
          this.onReset_add_proprietaires()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table proprietaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_proprietaires = false;
    })
  }

  get_details_add_proprietaires_form() {
      this.loading_get_details_add_proprietaires_form = true;
      this.api.taf_post("proprietaires/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table proprietaires. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table proprietaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_proprietaires_form = false;
      }, (error: any) => {
      this.loading_get_details_add_proprietaires_form = false;
    })
  }
}
