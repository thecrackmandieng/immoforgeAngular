import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ZonesTafType } from '../taf-type/zones-taf-type';
@Component({
  selector: 'app-add-zones',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-zones.component.html',
  styleUrls: ['./add-zones.component.css']
})
export class AddZonesComponent implements OnInit, OnDestroy {
  reactiveForm_add_zones !: FormGroup;
  submitted:boolean=false
  loading_add_zones :boolean=false
  form_details: any = {}
  loading_get_details_add_zones_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddZonesComponent");
      this.get_details_add_zones_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_zones  = this.formBuilder.group({
          region_id: [""],
code_zone: [""],
libelle: [""],
latitude: [""],
longitude: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_zones .controls; }
  // validation du formulaire
  onSubmit_add_zones () {
      this.submitted = true;
      console.log(this.reactiveForm_add_zones .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_zones .invalid) {
          return;
      }
      var zones =this.reactiveForm_add_zones .value
      this.add_zones (zones )
  }
  // vider le formulaire
  onReset_add_zones () {
      this.submitted = false;
      this.reactiveForm_add_zones .reset();
  }
  add_zones(zones: any) {
      this.loading_add_zones = true;
      this.api.taf_post("zones/add", zones, (reponse: any) => {
      this.loading_add_zones = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table zones. Réponse= ", reponse);
          this.onReset_add_zones()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table zones a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_zones = false;
    })
  }
  
  get_details_add_zones_form() {
      this.loading_get_details_add_zones_form = true;
      this.api.taf_post("zones/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table zones. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table zones a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_zones_form = false;
      }, (error: any) => {
      this.loading_get_details_add_zones_form = false;
    })
  }
}
