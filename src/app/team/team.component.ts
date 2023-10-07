import {Component, OnInit} from '@angular/core';
import {TeamService} from "./services/team.service";
import {Observable} from "rxjs";
import {Team} from "./interfaces/team";
import {MatDialog} from "@angular/material/dialog";
import {CreateTeamFormComponent} from "./components/create-team-form/create-team-form.component";
import {MatSelectChange} from "@angular/material/select";
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  teams$: Observable<Team[]> = new Observable<Team[]>
  constructor(private teamService: TeamService,
              public dialog: MatDialog,) {
  }
  ngOnInit():void {
    this.teams$ = this.teamService.getTeams()
  }
  onCreateTeam():void {
    const dialogRef = this.dialog.open(CreateTeamFormComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result: Team) => {
      this.teamService.createTeam(result).subscribe((result: any) => {
        this.teams$ = this.teamService.getTeams()
      })
    });
  }
  onSelectTeam(teamId: MatSelectChange):void{
    this.teamService.getTeamInfoById(teamId.value).subscribe((result:Team)=>{
      console.log(result)
    })
  }


}
