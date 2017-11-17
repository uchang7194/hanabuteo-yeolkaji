# [출처]: 웹 표준 핵심가이드북2 - 저자: 김데레사

# 콘텐츠 모델(Content Models)
- inline요소 block요소 이외에 좀 더 명확한 정보 구조 설계 및 구성을 위해 `카테고리를 정의`하여 `각 요소별로 비슷한 성격을 가지고 있는 것끼리 그룹화 한 것`
- 콘텐츠 모델이라는 개념을 통해 자식요소로 포함 할 수 있는 카테고리에 제한을 두어 구조와 구성을 중시.

### 섹셔닝 루트(Sectioning Root) 
> 독립적으로 구분되는 요소
#### 구성 요소
  - blockquote
  - body
  - detail
  - fieldset
  - figure
  - td

### 메타데이터 콘텐츠(Metdata Content) 
> 웹 브라우저에 직접적으로 표시되지 않으며, 문서와 문서간의 관계를 설정.
#### 구성 요소
  - base
  - link
  - meta
  - noscript
  - script
  - style
  - title
### 플로우 콘텐츠(Flow Content)
> body 요소에 들어가는 대부분의 요소들이 플로우 컨텐츠 모델에 속하며 area, link, meta, style 요소는 조건부로 플로우 컨텐츠가 된다.
#### 구성 요소
  - a
  - abbr
  - address
  - area( map 요소의 자손인 경우 )
  - article
  - aside
  - audio
  - b
  - bdi
  - bdo
  - bloackquote
  - br
  - button
  - canvas
  - cite
  - code
  - data
  - detalist
  - del
  - details
  - dfn
  - dialog
  - div
  - dl
  - em
  - embed
  - fieldset
  - figure
  - footer
  - form
  - h1, h2, h3, h4, h5, h6
  - header
  - hr
  - i
  - iframe
  - img
  - input
  - ins
  - kbd
  - keygen
  - label
  - main
  - map
  - mark
  - math
  - meter
  - nav
  - noscript
  - object
  - ol
  - output
  - p
  - pre
  - progress
  - q
  - ruby
  - s
  - samp
  - script
  - section
  - select
  - smail
  - span
  - strong
  - style( scpoed 속성이 있는 경우 )
  - sub
  - sup
  - svg
  - table
  - textarea
  - time
  - u
  - ul
  - var
  - video
  - wbr

### 섹셔닝 콘텐츠(Sectioning Content) 
> 제목과 내용을 포함한 범위를 지정하는 컨텐츠

#### 구성요소
  - article
  - aside
  - nav
  - section

### 헤딩 콘텐츠(Heading Content)
> 섹션의 제목을 나타내고 아운라인을 고려하여 사용해야 한다.

#### 구성요소
  - h1, h2, h3, h4, h5, h6

### 프레이징 콘텐츠(Phrasing Content)
> 문서의 텍스트를 나타내며 프레이징 콘텐츠의 자식요소로는 플로우 컨텐츠가 올 수 없고 프레이징 콘텐츠 요소만 포함 할 수 있다. 또한 임베디드 콘텐츠를 포함 할 수 있다.

#### 구성요소
  - a
  - abbr
  - area( map 요소의 자손인 경우 )
  - audio
  - b
  - bdi
  - bdo
  - br
  - button 
  - canvas
  - cite
  - code
  - data
  - datalist
  - del
  - dfn
  - em
  - embed
  - i
  - iframe
  - img
  - input
  - ins
  - kbd
  - keygen
  - label
  - map
  - mark
  - math
  - meter
  - noscript
  - select
  - smail
  - span
  - strong
  - sub
  - sup
  - svg
  - textarea
  - time
  - u
  - var
  - video
  - wbr

### 임베디드 콘텐츠(Embeded Content)
> 외부 요소 및 다른 언어로 표현되는 컨텐츠
#### 구성요소
  - audio
  - canvas
  - embed
  - iframe
  - img
  - math
  - object
  - svg
  - video

### 인터랙티브 콘텐츠(Interactive Content)
> 사용자가 어떤 기능을 조작학수 있는 콘텐츠
#### 구성요소
  - a
  - audio
  - button
  - details
  - embed
  - iframe
  - img( usemap 속성이 있는 경우 )
  - input( type속성이 hidden이 아닌 경우 )
  - keygen
  - label
  - object ( usemap 속성이 있는 경우 )
  - select
  - textarea
  - video ( controls 속성이 있는 경우 )

### 팰퍼블 콘텐츠(Palpable Content)
> 구체적으로 보여지고 이해할 수 있는 콘텐츠 요소. 숨김 상태여서는 안됨.
#### 구성요소
  - a
  - abbr
  - address
  - article
  - aside
  - audio ( controls 속성이 있는 경우 )
  - b
  - bdi
  - bdo
  - blockquote
  - button
  - canvas
  - cite
  - code
  - data
  - details
  - dfn
  - div
  - dl( dl 요소의 자식 요소로 하나 이상의 이름과 값으로 구성되어 있는 경우 )
  - em
  - embed
  - fieldset
  - figure
  - footer
  - form
  - h1, h2, h3, h4, h5, h6
  - i
  - iframe
  - img
  - input( hidden 속성 값이 아닌 경우 )
  - ins
  - kbd
  - keygen
  - label
  - main
  - map
  - mark
  - math
  - menu( toolbar 속성이 있는 경우 )
  - meter
  - nav
  - object
  - ol( 자식요소로 하나 이상의 li 요소를 포함한 경우 )
  - output
  - p
  - pre
  - progress
  - q
  - ruby
  - s
  - samp
  - section
  - select
  - smail
  - span
  - strong
  - sub
  - sup
  - svg
  - table
  - textarea
  - time
  - u
  - ul( 자식 요소로 하나 이상의 li 요소를 포함한 경우 )
  - var
  - video
  - span

### 스크립트 지원 요소
> 사용자에 대한 기능등에 해당하는 스크립트를 지원하는 데 사용된다.
#### 구성요소
  - script

### 트랜스 페어런트 콘텐츠(Transparent Content)
> 트랜스 페이런트 콘텐츠 요소와 그 안에 담긴 콘텐츠를 바꾸어 마크업해도 HTML5 문법에 오류가 없음.

### 구성요소
  - a
  - audio
  - canvas
  - del
  - ins
  - map
  - noscript
  - object
  - video
