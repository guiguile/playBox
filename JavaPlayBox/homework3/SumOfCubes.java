package homework3;

//********************************************************************
//  SumOfCubes.java       Author: Lewis/Loftus
//
//  Solution to Programming Project 3.2 
//********************************************************************

import java.util.Scanner;

public class SumOfCubes
{
    //-----------------------------------------------------------------
    //  Calculates the sum of two cubed integers.
    //-----------------------------------------------------------------
    public static void main(String[] args)
    {
        int num1, num2, value;
        Scanner scan = new Scanner(System.in);

        System.out.print("Enter two integers: ");
        num1 = scan.nextInt();
        num2 = scan.nextInt();

        value = (int) (Math.pow(num1, 3) + Math.pow(num2, 3));

        System.out.println("Sum of cubes: " + value);

        scan.close();
    }
}