import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienTarifsTafType } from '../taf-type/bien-tarifs-taf-type';
@Component({
  selector: 'app-add-bien-tarifs',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-bien-tarifs.component.html',
  styleUrls: ['./add-bien-tarifs.component.css']
})
export class AddBienTarifsComponent implements OnInit, OnDestroy {
  reactiveForm_add_bien_tarifs !: FormGroup;
  submitted:boolean=false
  loading_add_bien_tarifs :boolean=false
  form_details: any = {}
  loading_get_details_add_bien_tarifs_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddBienTarifsComponent");
      this.get_details_add_bien_tarifs_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_bien_tarifs  = this.formBuilder.group({
          bien_id: [""],
type_tarif_id: [""],
montant: [""],
devise: [""],
date_debut: [""],
date_fin: [""],
actif: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_bien_tarifs .controls; }
  // validation du formulaire
  onSubmit_add_bien_tarifs () {
      this.submitted = true;
      console.log(this.reactiveForm_add_bien_tarifs .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_bien_tarifs .invalid) {
          return;
      }
      var bien_tarifs =this.reactiveForm_add_bien_tarifs .value
      this.add_bien_tarifs (bien_tarifs )
  }
  // vider le formulaire
  onReset_add_bien_tarifs () {
      this.submitted = false;
      this.reactiveForm_add_bien_tarifs .reset();
  }
  add_bien_tarifs(bien_tarifs: any) {
      this.loading_add_bien_tarifs = true;
      this.api.taf_post("bien_tarifs/add", bien_tarifs, (reponse: any) => {
      this.loading_add_bien_tarifs = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table bien_tarifs. Réponse= ", reponse);
          this.onReset_add_bien_tarifs()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table bien_tarifs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_bien_tarifs = false;
    })
  }
  
  get_details_add_bien_tarifs_form() {
      this.loading_get_details_add_bien_tarifs_form = true;
      this.api.taf_post("bien_tarifs/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_tarifs. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_tarifs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_bien_tarifs_form = false;
      }, (error: any) => {
      this.loading_get_details_add_bien_tarifs_form = false;
    })
  }
}
