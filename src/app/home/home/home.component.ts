import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true, // Composant autonome
  imports: [RouterModule,NgbDropdownModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
{libelle:"BienDocuments",path:"/home/bien_documents"},
{libelle:"BienImages",path:"/home/bien_images"},
{libelle:"BienOption",path:"/home/bien_option"},
{libelle:"BienTarifs",path:"/home/bien_tarifs"},
{libelle:"Biens",path:"/home/biens"},
{libelle:"Clients",path:"/home/clients"},
{libelle:"Demandes",path:"/home/demandes"},
{libelle:"EtatsBien",path:"/home/etats_bien"},
{libelle:"EtatsDemande",path:"/home/etats_demande"},
{libelle:"Favoris",path:"/home/favoris"},
{libelle:"ModesPaiement",path:"/home/modes_paiement"},
{libelle:"OptionsCatalogue",path:"/home/options_catalogue"},
{libelle:"Permissions",path:"/home/permissions"},
{libelle:"PlansTarifaires",path:"/home/plans_tarifaires"},
{libelle:"Proprietaires",path:"/home/proprietaires"},
{libelle:"Regions",path:"/home/regions"},
{libelle:"ReglesCommission",path:"/home/regles_commission"},
{libelle:"RolePermission",path:"/home/role_permission"},
{libelle:"Roles",path:"/home/roles"},
{libelle:"StatutUser",path:"/home/statut_user"},
{libelle:"StatutValidationBien",path:"/home/statut_validation_bien"},
{libelle:"TypesBien",path:"/home/types_bien"},
{libelle:"TypesTarif",path:"/home/types_tarif"},
{libelle:"UserDocuments",path:"/home/user_documents"},
{libelle:"Users",path:"/home/users"},
{libelle:"Zones",path:"/home/zones"}
    ]
  }
}
