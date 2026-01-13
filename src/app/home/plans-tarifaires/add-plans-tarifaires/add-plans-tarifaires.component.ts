import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PlansTarifairesTafType } from '../taf-type/plans-tarifaires-taf-type';
@Component({
  selector: 'app-add-plans-tarifaires',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-plans-tarifaires.component.html',
  styleUrls: ['./add-plans-tarifaires.component.css']
})
export class AddPlansTarifairesComponent implements OnInit, OnDestroy {
  reactiveForm_add_plans_tarifaires !: FormGroup;
  submitted:boolean=false
  loading_add_plans_tarifaires :boolean=false
  form_details: any = {}
  loading_get_details_add_plans_tarifaires_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddPlansTarifairesComponent");
      this.get_details_add_plans_tarifaires_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_plans_tarifaires  = this.formBuilder.group({
          code: [""],
libelle: [""],
prix_mensuel: [""],
nb_biens_max: [""],
boost_visibilite: [""],
stats_avancees: [""],
badge_verifie: [""],
actif: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_plans_tarifaires .controls; }
  // validation du formulaire
  onSubmit_add_plans_tarifaires () {
      this.submitted = true;
      console.log(this.reactiveForm_add_plans_tarifaires .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_plans_tarifaires .invalid) {
          return;
      }
      var plans_tarifaires =this.reactiveForm_add_plans_tarifaires .value
      this.add_plans_tarifaires (plans_tarifaires )
  }
  // vider le formulaire
  onReset_add_plans_tarifaires () {
      this.submitted = false;
      this.reactiveForm_add_plans_tarifaires .reset();
  }
  add_plans_tarifaires(plans_tarifaires: any) {
      this.loading_add_plans_tarifaires = true;
      this.api.taf_post("plans_tarifaires/add", plans_tarifaires, (reponse: any) => {
      this.loading_add_plans_tarifaires = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table plans_tarifaires. Réponse= ", reponse);
          this.onReset_add_plans_tarifaires()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table plans_tarifaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_plans_tarifaires = false;
    })
  }
  
  get_details_add_plans_tarifaires_form() {
      this.loading_get_details_add_plans_tarifaires_form = true;
      this.api.taf_post("plans_tarifaires/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table plans_tarifaires. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table plans_tarifaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_plans_tarifaires_form = false;
      }, (error: any) => {
      this.loading_get_details_add_plans_tarifaires_form = false;
    })
  }
}
