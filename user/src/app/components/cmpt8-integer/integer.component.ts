import { Component, OnInit } from '@angular/core';
import { CurseService } from '../../services/curse.service'
import { UsersService } from '../../services/users.service'
import { ThemesService } from "../../services/themes.service";
import { TaskService } from '../../services/task.service'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-users-curse',
    templateUrl: './integer.component.html',
    styleUrls: ['./integer.component.css']
})
export class UsersCurseComponent implements OnInit {
  name = 'www.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);


XLSX.utils.sheet_add_aoa(worksheet, [
  [1],                             // <-- Write 1 to cell B3
  ,                                // <-- Do nothing in row 4
  [/*B5*/, /*C5*/, /*D5*/, {t: "n", f: 'SUMA(A1:A20, A20:A52)'}]  // <-- Write "abc" to cell E5
], { origin: "B54" });

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  options = {
    "offset": 0,
    "tolerance": 0,
    "classes": {
      "initial": "animated",
      "pinned": "bounceInDown",
      "unpinned": "bounceOutUp"
  }
    };
    constructor(
      private curseService: CurseService,
      private themesService: ThemesService,
      private router: ActivatedRoute,
      private task: TaskService,
      private UsersService: UsersService,
      private routerr: Router,
      private modal: NgbModal,
    ) { }
    photo: any = [];
    themes: any = [];
    apiURL = environment.apiURL;
    user = localStorage.getItem('id') || "";
    onImgError(event: any) {
        event.target.src = './assets/negz.jpg'
    }
        public rol: any = "";

        public text: string = "";
        public unitytitle: string = "";
        public themetitle: string = "";
        public texto: string = "";
        public textoimg: string = "";
    getintegersuser()
{
  if (localStorage.getItem('id')) {
			this.UsersService.getUser()
				.subscribe(
					(res: any) => {
						this.rol = res.rol
					},
					err => console.log(err)
				);
		};

}

getCurse(){
  this.router.params.subscribe(params => {
    //console.log(params['idcurso'])
      this.curseService.getintegers(params['idcurso'])
          .subscribe(
              (res: any) => {
                  this.photo = res;
                this.themes=res[0].cursse[0].units;
              },
              err => console.log(err)
          )
  });
}

    ngOnInit(): void {
        this.getintegersuser();
        this.getCurse();
    }


    open1(user:string){
        this.routerr.navigate(['/file', user])
    }

    erraseinteger(id: string) {
        if (window.confirm('Desea salir del curso?')) {
            this.curseService.deleteinteger(id)
                .subscribe(res => {
                        //console.log(res, "www");

                      this.getCurse();
                });

        }
    };
    openwww(w: any, task: string, archivo: string, unitytitle: string, themetitle: string) {
//    console.log(this.text,this.textoimg);
        this.modal.open(w, { size: 'xl', scrollable: true })
        this.text=task;
        this.themetitle=themetitle;
        this.unitytitle=unitytitle;
        this.textoimg=archivo;
    }


    deletetask(idtask: string ) {
            if (window.confirm('Desea eliminar la tarea?')) {
                this.themesService.deletetask(idtask)
                    .subscribe(res => {

                      this.getCurse();

                    });
            }
        };

        public archivos: any[] = [];

    onBlurMethod(event, id: string, task: string) {
      this.task.updatetask(task, event.target.value, id, this.archivos[0])
          .subscribe((res: any) => {
/*
            this.router.params.subscribe(params => {
            console.log(params['idcurso'])
            this.curseService.getintegers(params['idcurso'])
                .subscribe(
                (res: any) => {
                    this.photo = res;
                    console.log(res, "www");
                },
        err => console.log(err)
    )
    });
*/
          });
      return false;
      }


      savetask(idtheme: string, idunity: string, idcurse: string, iduser: string) {

              this.task.savetask( "Tarea entregada sin archivo", idtheme, idunity, idcurse, iduser, this.archivos[0] )
                  .subscribe(
                      (res:any) => {

                        this.getCurse();

                      },
                      err => console.log(err)
                  );
              return false;
              }


}
