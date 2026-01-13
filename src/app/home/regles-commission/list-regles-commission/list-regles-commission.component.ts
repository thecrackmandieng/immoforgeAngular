import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddReglesCommissionComponent } from '../add-regles-commission/add-regles-commission.component';
  import { EditReglesCommissionComponent } from '../edit-regles-commission/edit-regles-commission.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { ReglesCommissionTafType } from '../taf-type/regles-commission-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-regles-commission',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-regles-commission.component.html',
    styleUrls: ['./list-regles-commission.component.css']
  })
  export class ListReglesCommissionComponent implements OnInit, OnDestroy{
    loading_get_regles_commission = false
    loading_delete_regles_commission = false
    les_regles_commissions: ReglesCommissionTafType[] = []
    list: ReglesCommissionTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListReglesCommissionComponent");
      this.get_regles_commission()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_regles_commission() {
      this.loading_get_regles_commission = true;
      this.api.taf_post("regles_commission/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_regles_commissions = reponse.data
          console.log("Opération effectuée avec succés sur la table regles_commission. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table regles_commission a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_regles_commission = false;
      }, (error: any) => {
        this.loading_get_regles_commission = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_regles_commissions.filter((one: any) => {
        let search = !event?.term || JSON.stringify(one).toLowerCase().replace(/s/g, '')
          .includes(event?.term?.toLowerCase().replace(/s/g, ''))
        // filtre complexe
        // let filtre_objet: any = {}
        // let text = !this.filter.text || this.filter.text.length == 0
        //   || this.filter.text.filter((one_filtre: string) => {
        //     let domaine = !one_filtre.startsWith('domaine_') || (one_filtre.startsWith('domaine_') && one_filtre.replace('domaine_', '') == one.id_domaine)
        //     let zone = !one_filtre.startsWith('zone_') || (one_filtre.startsWith('zone_') && one_filtre.replace('zone_', '') == one.id_zone)

        //     // Incrémenter les compteurs
        //     if (one_filtre.startsWith('domaine_')) filtre_objet.domaine_ = (filtre_objet.domaine_ || 0) + 1
        //     if (one_filtre.startsWith('zone_')) filtre_objet.zone_ = (filtre_objet.zone_ || 0) + 1
        //     return domaine && zone
        //   }).length >= Object.keys(filtre_objet).length

        return search// && text
      })
    }
    delete_regles_commission (regles_commission : any){
      this.loading_delete_regles_commission = true;
      this.api.taf_post("regles_commission/delete", regles_commission,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table regles_commission . Réponse = ",reponse)
          this.get_regles_commission()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table regles_commission  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_regles_commission = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_regles_commission = false;
      })
    }
    openModal_add_regles_commission() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddReglesCommissionComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_regles_commission()
        } else {

        }
      })
    }
    openModal_edit_regles_commission(one_regles_commission: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditReglesCommissionComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.regles_commission_to_edit = one_regles_commission;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_regles_commission()
        } else {

        }
      })
    }
  }