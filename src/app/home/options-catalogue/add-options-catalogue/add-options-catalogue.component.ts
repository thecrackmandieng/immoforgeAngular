import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { OptionsCatalogueTafType } from '../taf-type/options-catalogue-taf-type';
@Component({
  selector: 'app-add-options-catalogue',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-options-catalogue.component.html',
  styleUrls: ['./add-options-catalogue.component.css']
})
export class AddOptionsCatalogueComponent implements OnInit, OnDestroy {
  reactiveForm_add_options_catalogue !: FormGroup;
  submitted:boolean=false
  loading_add_options_catalogue :boolean=false
  form_details: any = {}
  loading_get_details_add_options_catalogue_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddOptionsCatalogueComponent");
      this.get_details_add_options_catalogue_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_options_catalogue  = this.formBuilder.group({
          code: [""],
libelle: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_options_catalogue .controls; }
  // validation du formulaire
  onSubmit_add_options_catalogue () {
      this.submitted = true;
      console.log(this.reactiveForm_add_options_catalogue .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_options_catalogue .invalid) {
          return;
      }
      var options_catalogue =this.reactiveForm_add_options_catalogue .value
      this.add_options_catalogue (options_catalogue )
  }
  // vider le formulaire
  onReset_add_options_catalogue () {
      this.submitted = false;
      this.reactiveForm_add_options_catalogue .reset();
  }
  add_options_catalogue(options_catalogue: any) {
      this.loading_add_options_catalogue = true;
      this.api.taf_post("options_catalogue/add", options_catalogue, (reponse: any) => {
      this.loading_add_options_catalogue = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table options_catalogue. Réponse= ", reponse);
          this.onReset_add_options_catalogue()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table options_catalogue a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_options_catalogue = false;
    })
  }
  
  get_details_add_options_catalogue_form() {
      this.loading_get_details_add_options_catalogue_form = true;
      this.api.taf_post("options_catalogue/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table options_catalogue. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table options_catalogue a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_options_catalogue_form = false;
      }, (error: any) => {
      this.loading_get_details_add_options_catalogue_form = false;
    })
  }
}
