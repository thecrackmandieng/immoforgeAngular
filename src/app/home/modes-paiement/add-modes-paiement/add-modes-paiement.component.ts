import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModesPaiementTafType } from '../taf-type/modes-paiement-taf-type';
@Component({
  selector: 'app-add-modes-paiement',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-modes-paiement.component.html',
  styleUrls: ['./add-modes-paiement.component.css']
})
export class AddModesPaiementComponent implements OnInit, OnDestroy {
  reactiveForm_add_modes_paiement !: FormGroup;
  submitted:boolean=false
  loading_add_modes_paiement :boolean=false
  form_details: any = {}
  loading_get_details_add_modes_paiement_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddModesPaiementComponent");
      this.get_details_add_modes_paiement_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_modes_paiement  = this.formBuilder.group({
          code: [""],
libelle: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_modes_paiement .controls; }
  // validation du formulaire
  onSubmit_add_modes_paiement () {
      this.submitted = true;
      console.log(this.reactiveForm_add_modes_paiement .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_modes_paiement .invalid) {
          return;
      }
      var modes_paiement =this.reactiveForm_add_modes_paiement .value
      this.add_modes_paiement (modes_paiement )
  }
  // vider le formulaire
  onReset_add_modes_paiement () {
      this.submitted = false;
      this.reactiveForm_add_modes_paiement .reset();
  }
  add_modes_paiement(modes_paiement: any) {
      this.loading_add_modes_paiement = true;
      this.api.taf_post("modes_paiement/add", modes_paiement, (reponse: any) => {
      this.loading_add_modes_paiement = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table modes_paiement. Réponse= ", reponse);
          this.onReset_add_modes_paiement()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table modes_paiement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_modes_paiement = false;
    })
  }
  
  get_details_add_modes_paiement_form() {
      this.loading_get_details_add_modes_paiement_form = true;
      this.api.taf_post("modes_paiement/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table modes_paiement. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table modes_paiement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_modes_paiement_form = false;
      }, (error: any) => {
      this.loading_get_details_add_modes_paiement_form = false;
    })
  }
}
