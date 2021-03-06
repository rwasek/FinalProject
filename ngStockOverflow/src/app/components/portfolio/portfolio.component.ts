import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  userStocks: Stock[] = [];
  user: User = new User();
  selected: Stock = null;
  resources: Stock = null;
  chartSelect: Stock = null;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.loadUsersStocks();
    this.loggedInUserLoad();
  }

  loggedInUserLoad(){
    this.auth.showUser().subscribe(
      data => {
        this.user = data;
      },
      err => {
        console.error('userLoad() error in portfolio component');
      }
    );
  }


  loadUsersStocks(){
    this.userService.getUserStock().subscribe(
      data => {
        this.userStocks = data;
      },
      err => {
        console.error('error in portfolio component ts');

      }
    )
  }

  addNewStock(form: NgForm){
    const newStock: Stock = form.value;
    this.stockService.createStock(newStock).subscribe(
      data => {
        console.log('stock creation success');
        this.loadUsersStocks();
      },
      err => {
        console.error('error creating stock');
      }
      )
      form.reset();
    }

    updateStock(form: NgForm){
    const stock: Stock = form.value;

    this.stockService.updateStock(this.selected.symbol, stock).subscribe(
      data => {
        console.log('update goal success');
        this.loadUsersStocks();
      },
      err => {
        console.error('update goal failure');
      }
    )
    this.selected = null;
  }

  removeStock(stockSymbol: string, stock: Stock){
    this.stockService.destroyStock(stockSymbol).subscribe(
      data => {
        console.log('removal stock success');
        this.loadUsersStocks();
      },
      err => {
        console.error('removal failure');

      }
    )
  }

}
