import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientsTafType } from '../taf-type/clients-taf-type';
@Component({
  selector: 'app-add-clients',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit, OnDestroy {
  reactiveForm_add_clients !: FormGroup;
  submitted:boolean=false
  loading_add_clients :boolean=false
  form_details: any = {}
  loading_get_details_add_clients_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddClientsComponent");
      this.get_details_add_clients_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_clients  = this.formBuilder.group({
user_id: [""],
preferences: [""],
date_creation: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_clients .controls; }
  // validation du formulaire
  onSubmit_add_clients () {
      this.submitted = true;
      console.log(this.reactiveForm_add_clients .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_clients .invalid) {
          return;
      }
      var clients =this.reactiveForm_add_clients .value
      this.add_clients (clients )
  }
  // vider le formulaire
  onReset_add_clients () {
      this.submitted = false;
      this.reactiveForm_add_clients .reset();
  }
  add_clients(clients: any) {
      this.loading_add_clients = true;
      this.api.taf_post("clients/add", clients, (reponse: any) => {
      this.loading_add_clients = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table clients. Réponse= ", reponse);
          this.onReset_add_clients()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table clients a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_clients = false;
    })
  }

  get_details_add_clients_form() {
      this.loading_get_details_add_clients_form = true;
      this.api.taf_post("clients/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table clients. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table clients a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_clients_form = false;
      }, (error: any) => {
      this.loading_get_details_add_clients_form = false;
    })
  }
}
