import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReglesCommissionTafType } from '../taf-type/regles-commission-taf-type';
@Component({
  selector: 'app-edit-regles-commission',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-regles-commission.component.html',
  styleUrls: ['./edit-regles-commission.component.css']
})
export class EditReglesCommissionComponent implements OnInit, OnDestroy {
  reactiveForm_edit_regles_commission !: FormGroup;
  submitted: boolean = false
  loading_edit_regles_commission: boolean = false
  @Input()
  regles_commission_to_edit: ReglesCommissionTafType = new ReglesCommissionTafType();
  form_details: any = {}
  loading_get_details_edit_regles_commission_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditReglesCommissionComponent");
      this.get_details_edit_regles_commission_form()
      this.update_form(this.regles_commission_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(regles_commission_to_edit:any) {
      this.reactiveForm_edit_regles_commission = this.formBuilder.group({
          type_transaction : [regles_commission_to_edit.type_transaction],
pourcentage : [regles_commission_to_edit.pourcentage],
montant_fixe : [regles_commission_to_edit.montant_fixe],
actif : [regles_commission_to_edit.actif]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_regles_commission .controls; }
  // validation du formulaire
  onSubmit_edit_regles_commission() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_regles_commission.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_regles_commission.invalid) {
          return;
      }
      var regles_commission = this.reactiveForm_edit_regles_commission.value
      this.edit_regles_commission({
      condition:{id_comm:this.regles_commission_to_edit.id_comm},
      data:regles_commission
      })
  }
  // vider le formulaire
  onReset_edit_regles_commission() {
      this.submitted = false;
      this.reactiveForm_edit_regles_commission.reset();
  }
  edit_regles_commission(regles_commission: any) {
      this.loading_edit_regles_commission = true;
      this.api.taf_post("regles_commission/edit", regles_commission, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table regles_commission. Réponse= ", reponse);
              //this.onReset_edit_regles_commission()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table regles_commission a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_regles_commission = false;
      }, (error: any) => {
          this.loading_edit_regles_commission = false;
      })
  }
  get_details_edit_regles_commission_form() {
      this.loading_get_details_edit_regles_commission_form = true;
      this.api.taf_post("regles_commission/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table regles_commission. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table regles_commission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_regles_commission_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_regles_commission_form = false;
    })
  }
}