/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

export class Utils {

/*static columnComparator(a, b) {
      if (a.order < b.order)
        return -1;
      if (a.order > b.order)
        return 1;
    return 0;
  }; */

  static columnComparator(a, b) {
     return  a.order < b.order ? -1 : ( a.order > b.order ?  1 : 0);
  };

}
