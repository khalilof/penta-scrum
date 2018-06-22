/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

export class Column {
  public columnId: number;
  public title: string;
  public order: number;

/*   public serialize(): void {
    localStorage.setItem('Column', JSON.stringify({
      columnId: this.columnId,
      title: this.title,
      order: this.order
    }));
  }

  public deserialize(): void {
    if (localStorage.getItem('Column')) {
      var obj = JSON.parse(localStorage.getItem('Column'));
      this.columnId = obj.columnId;
      this.title = obj.title;
      this.order = obj.order;
    }
  } */

}
