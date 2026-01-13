import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EtatsDemandeTafType } from '../taf-type/etats-demande-taf-type';
@Component({
  selector: 'app-edit-etats-demande',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-etats-demande.component.html',
  styleUrls: ['./edit-etats-demande.component.css']
})
export class EditEtatsDemandeComponent implements OnInit, OnDestroy {
  reactiveForm_edit_etats_demande !: FormGroup;
  submitted: boolean = false
  loading_edit_etats_demande: boolean = false
  @Input()
  etats_demande_to_edit: EtatsDemandeTafType = new EtatsDemandeTafType();
  form_details: any = {}
  loading_get_details_edit_etats_demande_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditEtatsDemandeComponent");
      this.get_details_edit_etats_demande_form()
      this.update_form(this.etats_demande_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(etats_demande_to_edit:any) {
      this.reactiveForm_edit_etats_demande = this.formBuilder.group({
          code : [etats_demande_to_edit.code],
libelle : [etats_demande_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_etats_demande .controls; }
  // validation du formulaire
  onSubmit_edit_etats_demande() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_etats_demande.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_etats_demande.invalid) {
          return;
      }
      var etats_demande = this.reactiveForm_edit_etats_demande.value
      this.edit_etats_demande({
      condition:{id_etat_demande:this.etats_demande_to_edit.id_etat_demande},
      data:etats_demande
      })
  }
  // vider le formulaire
  onReset_edit_etats_demande() {
      this.submitted = false;
      this.reactiveForm_edit_etats_demande.reset();
  }
  edit_etats_demande(etats_demande: any) {
      this.loading_edit_etats_demande = true;
      this.api.taf_post("etats_demande/edit", etats_demande, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table etats_demande. Réponse= ", reponse);
              //this.onReset_edit_etats_demande()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table etats_demande a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_etats_demande = false;
      }, (error: any) => {
          this.loading_edit_etats_demande = false;
      })
  }
  get_details_edit_etats_demande_form() {
      this.loading_get_details_edit_etats_demande_form = true;
      this.api.taf_post("etats_demande/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table etats_demande. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table etats_demande a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_etats_demande_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_etats_demande_form = false;
    })
  }
}