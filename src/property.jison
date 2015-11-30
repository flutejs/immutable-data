%lex
%%

\"(?:\\\"|[^\"])*\"|\'(?:\\\'|[^\'])*\' return 'STRING'
[a-zA-Z_\$][\w_\$]*                     return 'PROPERTY'
0|[1-9]\d*                              return 'NUMBER'
'['                                     return '['
']'                                     return ']'
'.'                                     return '.'
<<EOF>>                                 return 'EOF'
.                                       return 'INVALID'

/lex


%start expressions
%%

expressions


    : e EOF
        {return $1}
    ;

e
    : PROPERTY p
        {$$ = {p:$1,e:$2}}
    | NUMBER p
        {$$ = {p:$1,e:$2}}
    ;


p
    : '.' e
        {$$ = {e:$2}}
    | '[' t ']' p
        {$$ = {p:$2,e:$4}}
    |
    ; 
t
    : STRING
        {$$ = $1}
    | NUMBER
        {$$ = $1}
    ;
