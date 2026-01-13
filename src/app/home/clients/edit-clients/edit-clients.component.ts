import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientsTafType } from '../taf-type/clients-taf-type';
@Component({
  selector: 'app-edit-clients',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit, OnDestroy {
  reactiveForm_edit_clients !: FormGroup;
  submitted: boolean = false
  loading_edit_clients: boolean = false
  @Input()
  clients_to_edit: ClientsTafType = new ClientsTafType();
  form_details: any = {}
  loading_get_details_edit_clients_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
      console.groupCollapsed("EditClientsComponent");
      this.get_details_edit_clients_form()
      this.update_form(this.clients_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(clients_to_edit:any) {
      this.reactiveForm_edit_clients = this.formBuilder.group({
user_id : [clients_to_edit.user_id],
preferences : [clients_to_edit.preferences],
date_creation : [clients_to_edit.date_creation]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_clients .controls; }
  // validation du formulaire
  onSubmit_edit_clients() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_clients.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_clients.invalid) {
          return;
      }
      var clients = this.reactiveForm_edit_clients.value
      this.edit_clients({
      condition:{id_client:this.clients_to_edit.id_client},
      data:clients
      })
  }
  // vider le formulaire
  onReset_edit_clients() {
      this.submitted = false;
      this.reactiveForm_edit_clients.reset();
  }
  edit_clients(clients: any) {
      this.loading_edit_clients = true;
      this.api.taf_post("clients/edit", clients, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table clients. Réponse= ", reponse);
              //this.onReset_edit_clients()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table clients a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_clients = false;
      }, (error: any) => {
          this.loading_edit_clients = false;
      })
  }
  get_details_edit_clients_form() {
      this.loading_get_details_edit_clients_form = true;
      this.api.taf_post("clients/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table clients. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table clients a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_clients_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_clients_form = false;
    })
  }
}
