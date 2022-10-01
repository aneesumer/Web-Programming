<script>
      // 1. Psuedo Code

      function gcd(a, b) {
        swap(a, b);
        rem = a % b;
        while (rem > 0) {
          a = b;
          b = rem;
          rem = a % b;
        }
        gcd = b;
      }

      function swap(a, b) {
        if (a < b) {
          c = a;
          a = b;
          b = c;
        }
      }

      // 2. Array Functions

      let arr = [4, 22, 4, 40, 2, 6, 2];

      function cube(a) {
        return a.map((e) => e * 3);
      }

      console.log(cube(arr));

      // 3. Array Functions

      function position(a) {
        return a.map((e,i) => (e + i))
      }

      console.log(position(arr))

      // 4. Array Functions
      let s =  "anees"

      function vowelCount (a) {
        return a.split("").filter(e => ['a', 'e', 'i', 'o', 'u'].includes(e)).length
      }

      console.log(vowelCount(s))

      // 5. Array Functions

      function sum(a) {
        return a.reduce((t,e)  => e + t, 0)
      }

      console.log(sum(arr))

      // 6. Array Functions

      function largest(a) {
        return a.reduce(((t, e) => e > t ? e : t), -Infinity)
      }

      console.log(largest(arr))

      // 7. Array Functions

      function negative1(a) {
        return a.some(e => e < 0)
      }

      function negative2(a) {
        return a.reduce((t,e) => e  < 0 ? true : false, false)
      }

      function negative3(a) {
        return a.filter(e => e < 0).length > 0
      }

      console.log(negative1(arr))
      console.log(negative2(arr))
      console.log(negative3(arr))

      // 8. Array Functions

      const matrix = [[1,2,3],
                      [4,5,6]]

      function evenMatrix(a) {
        return a.flat().every(e => e % 2 == 0)
      }
      
      console.log(evenMatrix(arr))


      // 9. Objects

      const obj = [
        {name: "Jan Kowalski", neptune: "F3S5K2", GPA: "2.04"},
        {name: "Petar Petrovici", neptune: "K91FFG", GPA: "4.37"},
        {name: "Yamada Hanako", neptune: "UWU431", GPA: "5.00"},
      ]

      // 10. Worst GPA

      function worstGPA (a) {
        return obj.reduce((t,a) => (a.GPA < t ? a.GPA : t), +Infinity)
      }

      console.log(worstGPA(obj))
       
      // 11. Worst Student
      
      function worstStudent(a) {
        return obj.reduce((t,e) => (e.GPA < t ? e : t), +Infinity)
      }

      console.log(worstStudent(obj))

      // 12. Average GPA

      function averageGPA(a) {
        return obj.reduce((t,e) => (t.GPA + e.GPA))
      }

      console.log(averageGPA(obj))

    </script>
