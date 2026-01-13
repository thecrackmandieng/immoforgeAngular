import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienOptionTafType } from '../taf-type/bien-option-taf-type';
@Component({
  selector: 'app-add-bien-option',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-bien-option.component.html',
  styleUrls: ['./add-bien-option.component.css']
})
export class AddBienOptionComponent implements OnInit, OnDestroy {
  reactiveForm_add_bien_option !: FormGroup;
  submitted:boolean=false
  loading_add_bien_option :boolean=false
  form_details: any = {}
  loading_get_details_add_bien_option_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddBienOptionComponent");
      this.get_details_add_bien_option_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_bien_option  = this.formBuilder.group({
bien_id: [""],
option_id: [""],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_bien_option .controls; }
  // validation du formulaire
  onSubmit_add_bien_option () {
      this.submitted = true;
      console.log(this.reactiveForm_add_bien_option .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_bien_option .invalid) {
          return;
      }
      var bien_option =this.reactiveForm_add_bien_option .value
      this.add_bien_option (bien_option )
  }
  // vider le formulaire
  onReset_add_bien_option () {
      this.submitted = false;
      this.reactiveForm_add_bien_option .reset();
  }
  add_bien_option(bien_option: any) {
      this.loading_add_bien_option = true;
      this.api.taf_post("bien_option/add", bien_option, (reponse: any) => {
      this.loading_add_bien_option = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table bien_option. Réponse= ", reponse);
          this.onReset_add_bien_option()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table bien_option a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_bien_option = false;
    })
  }

  get_details_add_bien_option_form() {
      this.loading_get_details_add_bien_option_form = true;
      this.api.taf_post("bien_option/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_option. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_option a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_bien_option_form = false;
      }, (error: any) => {
      this.loading_get_details_add_bien_option_form = false;
    })
  }
}
