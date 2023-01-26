import { Customer } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { GoodsreceiptnoteService } from './../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { InvoiceById } from './../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoices: InvoiceById[] = [];
  searchData: string = '';
  listsearch: any;
  selectedProvince = 'SearchBarcode';
  loading: boolean = true;
  // nameList = [
  //   { text: 'Xuất hàng bán', value: 'Xuất hàng bán' },
  //   { text: 'Xuất hỏng', value: 'Xuất hỏng'}
  // ];
  // nameFilterFn = (list: string[], item: any): boolean => list.some(barcode => item.barcode.indexOf(barcode.slice(0, 3)) !== 'GIN');
  constructor(
    private invoice: GoodsreceiptnoteService,
    private router: Router
  ) {}

  detailInvoice(id: number) {
    this.router.navigate(['dashboard/detail-invoice/' + id]);
  }

  ngOnInit(): void {
    this.invoice.getInvoices().subscribe((result) => {
      this.invoices = result.data;
      this.listsearch = this.invoices;
      this.loading = false;
      console.log(this.invoices);
    });
  }

  SearchOption(value: string) {
    this.selectedProvince = value;
    console.log(this.selectedProvince);
  }

  getListSearch() {
    // console.log(this.searchData);

    if (this.selectedProvince == 'SearchBarcode') {
      this.listsearch = this.invoices.filter((data) =>
        data.barcode
          .toLocaleLowerCase()
          .includes(this.searchData.toLocaleLowerCase())
      );
    } else if (this.selectedProvince == 'SearchCustomerName') {
      this.listsearch = this.invoices.filter((data) =>
        data.customer.fullName != null
          ? data.customer.fullName
              .toLocaleLowerCase()
              .includes(this.searchData.toLocaleLowerCase())
          : this.searchData == ''
          ? this.invoice
          : null
      );
    } else if (this.selectedProvince == 'SearchStaffName') {
      this.listsearch = this.invoices.filter((data) =>
        data.createdBy.name
          .toLocaleLowerCase()
          .includes(this.searchData.toLocaleLowerCase())
      );
    }
  }
  exportType(barcode: string) {
    let a = barcode.slice(0, 3)

    if (a == 'GIN') {
      return "Xuất hỏng"
    }
    return "Xuất hàng bán"

  }
}
