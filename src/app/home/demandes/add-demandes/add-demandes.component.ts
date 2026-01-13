import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DemandesTafType } from '../taf-type/demandes-taf-type';
@Component({
  selector: 'app-add-demandes',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-demandes.component.html',
  styleUrls: ['./add-demandes.component.css']
})
export class AddDemandesComponent implements OnInit, OnDestroy {
  reactiveForm_add_demandes !: FormGroup;
  submitted:boolean=false
  loading_add_demandes :boolean=false
  form_details: any = {}
  loading_get_details_add_demandes_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddDemandesComponent");
      this.get_details_add_demandes_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_demandes  = this.formBuilder.group({
          uuid: [""],
client_user_id: [""],
bien_id: [""],
type_demande: [""],
etat_demande_id: [""],
date_debut: [""],
date_fin: [""],
montant_estime: [""],
acompte_payee: [""],
mode_paiement_acompte_id: [""],
message: [""],
date_demande: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_demandes .controls; }
  // validation du formulaire
  onSubmit_add_demandes () {
      this.submitted = true;
      console.log(this.reactiveForm_add_demandes .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_demandes .invalid) {
          return;
      }
      var demandes =this.reactiveForm_add_demandes .value
      this.add_demandes (demandes )
  }
  // vider le formulaire
  onReset_add_demandes () {
      this.submitted = false;
      this.reactiveForm_add_demandes .reset();
  }
  add_demandes(demandes: any) {
      this.loading_add_demandes = true;
      this.api.taf_post("demandes/add", demandes, (reponse: any) => {
      this.loading_add_demandes = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table demandes. Réponse= ", reponse);
          this.onReset_add_demandes()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table demandes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_demandes = false;
    })
  }
  
  get_details_add_demandes_form() {
      this.loading_get_details_add_demandes_form = true;
      this.api.taf_post("demandes/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table demandes. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table demandes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_demandes_form = false;
      }, (error: any) => {
      this.loading_get_details_add_demandes_form = false;
    })
  }
}
