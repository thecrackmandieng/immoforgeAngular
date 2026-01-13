import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PlansTarifairesTafType } from '../taf-type/plans-tarifaires-taf-type';
@Component({
  selector: 'app-edit-plans-tarifaires',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-plans-tarifaires.component.html',
  styleUrls: ['./edit-plans-tarifaires.component.css']
})
export class EditPlansTarifairesComponent implements OnInit, OnDestroy {
  reactiveForm_edit_plans_tarifaires !: FormGroup;
  submitted: boolean = false
  loading_edit_plans_tarifaires: boolean = false
  @Input()
  plans_tarifaires_to_edit: PlansTarifairesTafType = new PlansTarifairesTafType();
  form_details: any = {}
  loading_get_details_edit_plans_tarifaires_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditPlansTarifairesComponent");
      this.get_details_edit_plans_tarifaires_form()
      this.update_form(this.plans_tarifaires_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(plans_tarifaires_to_edit:any) {
      this.reactiveForm_edit_plans_tarifaires = this.formBuilder.group({
          code : [plans_tarifaires_to_edit.code],
libelle : [plans_tarifaires_to_edit.libelle],
prix_mensuel : [plans_tarifaires_to_edit.prix_mensuel],
nb_biens_max : [plans_tarifaires_to_edit.nb_biens_max],
boost_visibilite : [plans_tarifaires_to_edit.boost_visibilite],
stats_avancees : [plans_tarifaires_to_edit.stats_avancees],
badge_verifie : [plans_tarifaires_to_edit.badge_verifie],
actif : [plans_tarifaires_to_edit.actif]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_plans_tarifaires .controls; }
  // validation du formulaire
  onSubmit_edit_plans_tarifaires() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_plans_tarifaires.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_plans_tarifaires.invalid) {
          return;
      }
      var plans_tarifaires = this.reactiveForm_edit_plans_tarifaires.value
      this.edit_plans_tarifaires({
      condition:{id_plan:this.plans_tarifaires_to_edit.id_plan},
      data:plans_tarifaires
      })
  }
  // vider le formulaire
  onReset_edit_plans_tarifaires() {
      this.submitted = false;
      this.reactiveForm_edit_plans_tarifaires.reset();
  }
  edit_plans_tarifaires(plans_tarifaires: any) {
      this.loading_edit_plans_tarifaires = true;
      this.api.taf_post("plans_tarifaires/edit", plans_tarifaires, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table plans_tarifaires. Réponse= ", reponse);
              //this.onReset_edit_plans_tarifaires()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table plans_tarifaires a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_plans_tarifaires = false;
      }, (error: any) => {
          this.loading_edit_plans_tarifaires = false;
      })
  }
  get_details_edit_plans_tarifaires_form() {
      this.loading_get_details_edit_plans_tarifaires_form = true;
      this.api.taf_post("plans_tarifaires/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table plans_tarifaires. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table plans_tarifaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_plans_tarifaires_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_plans_tarifaires_form = false;
    })
  }
}