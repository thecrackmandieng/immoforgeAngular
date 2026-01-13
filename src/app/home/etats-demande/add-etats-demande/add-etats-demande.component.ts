import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EtatsDemandeTafType } from '../taf-type/etats-demande-taf-type';
@Component({
  selector: 'app-add-etats-demande',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-etats-demande.component.html',
  styleUrls: ['./add-etats-demande.component.css']
})
export class AddEtatsDemandeComponent implements OnInit, OnDestroy {
  reactiveForm_add_etats_demande !: FormGroup;
  submitted:boolean=false
  loading_add_etats_demande :boolean=false
  form_details: any = {}
  loading_get_details_add_etats_demande_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddEtatsDemandeComponent");
      this.get_details_add_etats_demande_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_etats_demande  = this.formBuilder.group({
          code: [""],
libelle: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_etats_demande .controls; }
  // validation du formulaire
  onSubmit_add_etats_demande () {
      this.submitted = true;
      console.log(this.reactiveForm_add_etats_demande .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_etats_demande .invalid) {
          return;
      }
      var etats_demande =this.reactiveForm_add_etats_demande .value
      this.add_etats_demande (etats_demande )
  }
  // vider le formulaire
  onReset_add_etats_demande () {
      this.submitted = false;
      this.reactiveForm_add_etats_demande .reset();
  }
  add_etats_demande(etats_demande: any) {
      this.loading_add_etats_demande = true;
      this.api.taf_post("etats_demande/add", etats_demande, (reponse: any) => {
      this.loading_add_etats_demande = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table etats_demande. Réponse= ", reponse);
          this.onReset_add_etats_demande()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table etats_demande a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_etats_demande = false;
    })
  }
  
  get_details_add_etats_demande_form() {
      this.loading_get_details_add_etats_demande_form = true;
      this.api.taf_post("etats_demande/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table etats_demande. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table etats_demande a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_etats_demande_form = false;
      }, (error: any) => {
      this.loading_get_details_add_etats_demande_form = false;
    })
  }
}
