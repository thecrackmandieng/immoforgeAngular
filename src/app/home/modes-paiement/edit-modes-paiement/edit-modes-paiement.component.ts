import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModesPaiementTafType } from '../taf-type/modes-paiement-taf-type';
@Component({
  selector: 'app-edit-modes-paiement',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-modes-paiement.component.html',
  styleUrls: ['./edit-modes-paiement.component.css']
})
export class EditModesPaiementComponent implements OnInit, OnDestroy {
  reactiveForm_edit_modes_paiement !: FormGroup;
  submitted: boolean = false
  loading_edit_modes_paiement: boolean = false
  @Input()
  modes_paiement_to_edit: ModesPaiementTafType = new ModesPaiementTafType();
  form_details: any = {}
  loading_get_details_edit_modes_paiement_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditModesPaiementComponent");
      this.get_details_edit_modes_paiement_form()
      this.update_form(this.modes_paiement_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(modes_paiement_to_edit:any) {
      this.reactiveForm_edit_modes_paiement = this.formBuilder.group({
          code : [modes_paiement_to_edit.code],
libelle : [modes_paiement_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_modes_paiement .controls; }
  // validation du formulaire
  onSubmit_edit_modes_paiement() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_modes_paiement.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_modes_paiement.invalid) {
          return;
      }
      var modes_paiement = this.reactiveForm_edit_modes_paiement.value
      this.edit_modes_paiement({
      condition:{id_mode:this.modes_paiement_to_edit.id_mode},
      data:modes_paiement
      })
  }
  // vider le formulaire
  onReset_edit_modes_paiement() {
      this.submitted = false;
      this.reactiveForm_edit_modes_paiement.reset();
  }
  edit_modes_paiement(modes_paiement: any) {
      this.loading_edit_modes_paiement = true;
      this.api.taf_post("modes_paiement/edit", modes_paiement, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table modes_paiement. Réponse= ", reponse);
              //this.onReset_edit_modes_paiement()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table modes_paiement a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_modes_paiement = false;
      }, (error: any) => {
          this.loading_edit_modes_paiement = false;
      })
  }
  get_details_edit_modes_paiement_form() {
      this.loading_get_details_edit_modes_paiement_form = true;
      this.api.taf_post("modes_paiement/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table modes_paiement. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table modes_paiement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_modes_paiement_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_modes_paiement_form = false;
    })
  }
}