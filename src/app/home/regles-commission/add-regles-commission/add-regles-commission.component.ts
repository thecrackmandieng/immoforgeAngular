import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReglesCommissionTafType } from '../taf-type/regles-commission-taf-type';
@Component({
  selector: 'app-add-regles-commission',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-regles-commission.component.html',
  styleUrls: ['./add-regles-commission.component.css']
})
export class AddReglesCommissionComponent implements OnInit, OnDestroy {
  reactiveForm_add_regles_commission !: FormGroup;
  submitted:boolean=false
  loading_add_regles_commission :boolean=false
  form_details: any = {}
  loading_get_details_add_regles_commission_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddReglesCommissionComponent");
      this.get_details_add_regles_commission_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_regles_commission  = this.formBuilder.group({
          type_transaction: [""],
pourcentage: [""],
montant_fixe: [""],
actif: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_regles_commission .controls; }
  // validation du formulaire
  onSubmit_add_regles_commission () {
      this.submitted = true;
      console.log(this.reactiveForm_add_regles_commission .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_regles_commission .invalid) {
          return;
      }
      var regles_commission =this.reactiveForm_add_regles_commission .value
      this.add_regles_commission (regles_commission )
  }
  // vider le formulaire
  onReset_add_regles_commission () {
      this.submitted = false;
      this.reactiveForm_add_regles_commission .reset();
  }
  add_regles_commission(regles_commission: any) {
      this.loading_add_regles_commission = true;
      this.api.taf_post("regles_commission/add", regles_commission, (reponse: any) => {
      this.loading_add_regles_commission = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table regles_commission. Réponse= ", reponse);
          this.onReset_add_regles_commission()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table regles_commission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_regles_commission = false;
    })
  }
  
  get_details_add_regles_commission_form() {
      this.loading_get_details_add_regles_commission_form = true;
      this.api.taf_post("regles_commission/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table regles_commission. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table regles_commission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_regles_commission_form = false;
      }, (error: any) => {
      this.loading_get_details_add_regles_commission_form = false;
    })
  }
}
