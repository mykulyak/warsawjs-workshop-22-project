# Projekt na potrzeby warsztatów WarsawJS #22 - grupa 4

Podczas warsztatów będziemy rozwijali i pokrywali testami "Kantor walutowy",
niewielką aplikację pozwalającą na sprawdzenie kursów, sprzedaż oraz
kupno walut obcych.

## Funkcjonalność aplikacji

- klient może sprawdzić listę walut
- klient może sprawdzić aktualne kursy walut
- klient może sprawdzić historyczne kurszy danej waluty
- klient może "kupować" walutę obcą
- klient może "sprzedawać" walutę obcą
- klient może "wymieniać" jedną walutę na inną
- za operacje kantor pobiera prowizję
    - prowizja za sprzedaż i kupno mogą się różnić
- kantor zapisuje w twałym schowku informacje o transakcjach
    - ilość kupionej oraz sprzedanej waluty
- kantor posiada interfejs terminałowy oraz Webowy
- kursy walut zaciągamy ze strony [NBP](http://api.nbp.pl/#kursyWalut)

Design interfejsu Webowego jest pokazany na [obrazku](design/design.png)
lub [tutaj](https://wireframe.cc/Ih8iNG).

## Jak uruchomić testy

jednorazowo

```
> npm test
```

w trybie śledzenia

```
> npm test:watch
```

