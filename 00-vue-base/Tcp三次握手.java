
Tcp三次握手：
   为什么需要三次握手呢?为了防止已失效的连接请求报文突然又传送到了服务器，因而产生错误。

   比如：client发出的第一个连接请求报文并没有丢失，而是在某个网络节点长时间的滞留了，
   以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段，
   但是server收到此失效的连接请求报文段后，就误以为是client再次发出的一个新的连接请求，
   于是就向client发出确认报文段，同意建立连接，假设不采用"三次握手"，那么只要server发出确认，
   新的连接就建立了，由于client并没有发出建立连接的请求，因此并不会理睬server的确认，
   也不会向server发送数据，但server却认为新的运输连接已经建立，并一直等待client发来数据。
   所以没有采用"三次握手"，这种情况下server的很多资源就白白浪费掉了

   第一次握手
   客户主动（active open）去connect服务器，并且发送SYN 假设序列号为J,
   服务器是被动打开(passive open)

   第二次握手
   服务器在收到SYN后，它会发送一个SYN以及一个ACK（应答）给客户，
   ACK的序列号是 J+1表示是给SYN J的应答，新发送的SYN K 序列号是K

   第三次握手
   客户在收到新SYN K, ACK J+1 后，也回应ACK K+1 以表示收到了，
   然后两边就可以开始数据发送数据了

Tcp四次挥手：
   为什么需要四次挥手？Tcp是全双工模式。

   1、当client发出FIN报文段时，只是表示client已经没有数据要发送了，client告诉server，他的数据已经全部发送完毕；但是，这个时候client还是可以接受来server的数据；
   2、当server返回ACK报文段时，表示他已经知道client没有数据发送了，但是server还是可以到那个数据到client的；
   3、当server也发送了FIN报文段时，这个时候就表示server也没有数据要发送了，就会告诉client，我也没有数据要发送了，
   4、如果收到client确认报文段，之后彼此就会愉快的终端这次TCP连接