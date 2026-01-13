import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DemandesTafType } from '../taf-type/demandes-taf-type';
@Component({
  selector: 'app-edit-demandes',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-demandes.component.html',
  styleUrls: ['./edit-demandes.component.css']
})
export class EditDemandesComponent implements OnInit, OnDestroy {
  reactiveForm_edit_demandes !: FormGroup;
  submitted: boolean = false
  loading_edit_demandes: boolean = false
  @Input()
  demandes_to_edit: DemandesTafType = new DemandesTafType();
  form_details: any = {}
  loading_get_details_edit_demandes_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditDemandesComponent");
      this.get_details_edit_demandes_form()
      this.update_form(this.demandes_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(demandes_to_edit:any) {
      this.reactiveForm_edit_demandes = this.formBuilder.group({
          uuid : [demandes_to_edit.uuid],
client_user_id : [demandes_to_edit.client_user_id],
bien_id : [demandes_to_edit.bien_id],
type_demande : [demandes_to_edit.type_demande],
etat_demande_id : [demandes_to_edit.etat_demande_id],
date_debut : [demandes_to_edit.date_debut],
date_fin : [demandes_to_edit.date_fin],
montant_estime : [demandes_to_edit.montant_estime],
acompte_payee : [demandes_to_edit.acompte_payee],
mode_paiement_acompte_id : [demandes_to_edit.mode_paiement_acompte_id],
message : [demandes_to_edit.message],
date_demande : [demandes_to_edit.date_demande]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_demandes .controls; }
  // validation du formulaire
  onSubmit_edit_demandes() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_demandes.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_demandes.invalid) {
          return;
      }
      var demandes = this.reactiveForm_edit_demandes.value
      this.edit_demandes({
      condition:{id_demande:this.demandes_to_edit.id_demande},
      data:demandes
      })
  }
  // vider le formulaire
  onReset_edit_demandes() {
      this.submitted = false;
      this.reactiveForm_edit_demandes.reset();
  }
  edit_demandes(demandes: any) {
      this.loading_edit_demandes = true;
      this.api.taf_post("demandes/edit", demandes, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table demandes. Réponse= ", reponse);
              //this.onReset_edit_demandes()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table demandes a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_demandes = false;
      }, (error: any) => {
          this.loading_edit_demandes = false;
      })
  }
  get_details_edit_demandes_form() {
      this.loading_get_details_edit_demandes_form = true;
      this.api.taf_post("demandes/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table demandes. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table demandes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_demandes_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_demandes_form = false;
    })
  }
}